package com.editus.backend.domain.project.service;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.domain.project.dto.CreateProjectRequest;
import com.editus.backend.domain.project.dto.ProjectDto;
import com.editus.backend.domain.project.entity.Invitation;
import com.editus.backend.domain.project.entity.Project;
import com.editus.backend.domain.project.entity.ProjectMember;
import com.editus.backend.domain.project.repository.InvitationRepository;
import com.editus.backend.domain.project.repository.ProjectMemberRepository;
import com.editus.backend.domain.project.repository.ProjectRepository;
import com.editus.backend.global.exception.ProjectAccessDeniedException;
import com.editus.backend.global.exception.ProjectNotFoundException;
import com.editus.backend.global.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;

    @Transactional
    public String createInvitation(Long projectId, Long requesterId, Integer expiresInHours) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));

        if (!project.getOwner().getUserId().equals(requesterId)) {
            throw new IllegalArgumentException("초대 링크 생성 권한이 없습니다.");
        }

        String code = UUID.randomUUID().toString().replace("-", "");

        int validHours = (expiresInHours != null && expiresInHours > 0) ? expiresInHours : 24;
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(validHours);

        Invitation invitation = Invitation.builder()
                .code(code)
                .project(project)
                .inviter(project.getOwner())
                .expiresAt(expiresAt)
                .used(false)
                .build();

        invitationRepository.save(invitation);
        return code;
    }

    @Transactional
    public Project joinProject(String code, Long userId) {
        // Soft delete 적용: 삭제되지 않은 초대 코드만 조회
        Invitation invitation = invitationRepository.findByCodeAndDeletedFalse(code)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 초대 코드입니다."));

        if (!invitation.isValid()) {
            throw new IllegalArgumentException("만료되었거나 이미 사용된 초대 코드입니다.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Project project = invitation.getProject();

        // Check if already a member or owner
        if (project.getOwner().getUserId().equals(userId) ||
                projectMemberRepository.existsByProjectAndUser(project, user)) {
            throw new IllegalArgumentException("이미 프로젝트의 멤버입니다.");
        }

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(user)
                .build();

        projectMemberRepository.save(member);
        invitation.markAsUsed();

        return project;
    }

    public List<ProjectMember> getProjectMembers(Long projectId, Long requesterId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));

        // 권한 확인: 프로젝트 멤버 또는 오너만 조회 가능
        boolean isOwner = project.getOwner().getUserId().equals(requesterId);
        if (!isOwner) {
            User requester = userRepository.findById(requesterId)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
            if (!projectMemberRepository.existsByProjectAndUser(project, requester)) {
                throw new IllegalArgumentException("프로젝트 멤버 목록을 볼 권한이 없습니다.");
            }
        }

        return projectMemberRepository.findByProjectIdWithUser(projectId);
    }

    @Transactional
    public void removeMember(Long projectId, Long userIdToRemove, Long requesterId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));

        if (!project.getOwner().getUserId().equals(requesterId)) {
            throw new IllegalArgumentException("멤버 삭제 권한이 없습니다 (오너만 가능).");
        }

        if (project.getOwner().getUserId().equals(userIdToRemove)) {
            throw new IllegalArgumentException("오너는 스스로를 삭제할 수 없습니다.");
        }

        User userToRemove = userRepository.findById(userIdToRemove)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 사용자를 찾을 수 없습니다."));

        projectMemberRepository.deleteByProjectAndUser(project, userToRemove);
    }


    // ==================== 프로젝트 CRUD 기능 ====================

    /**
     * 사용자별 프로젝트 목록 조회
     */
    public List<ProjectDto> getProjectsByUserId(Long userId) {
        List<Project> projects = projectRepository.findByOwnerUserId(userId);
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 프로젝트 생성 (현재 사용자가 owner)
     */
    @Transactional
    public ProjectDto createProject(Long userId, CreateProjectRequest request) {
        // 사용자 조회
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다"));

        // 프로젝트 생성
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .owner(owner)
                .build();

        Project savedProject = projectRepository.save(project);
        return convertToDto(savedProject);
    }

    /**
     * 프로젝트 단건 조회 (권한 검증)
     */
    public ProjectDto getProjectByIdWithAuth(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("프로젝트를 찾을 수 없습니다"));

        // 권한 검증
        validateProjectOwner(project, userId);

        return convertToDto(project);
    }

    /**
     * 프로젝트 삭제 (권한 검증)
     */
    @Transactional
    public void deleteProjectWithAuth(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("프로젝트를 찾을 수 없습니다"));

        // 권한 검증
        validateProjectOwner(project, userId);

        projectRepository.delete(project);
    }

    /**
     * 프로젝트 이름 검색 (사용자별 필터링)
     */
    public List<ProjectDto> searchProjects(Long userId, String keyword) {
        List<Project> projects = projectRepository.findByOwnerUserIdAndNameContaining(userId, keyword);
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 권한 검증: 프로젝트 소유자인지 확인
     */
    private void validateProjectOwner(Project project, Long userId) {
        if (!project.getOwner().getUserId().equals(userId)) {
            throw new ProjectAccessDeniedException("프로젝트에 접근할 권한이 없습니다");
        }
    }

    /**
     * Entity -> DTO 변환
     */
    private ProjectDto convertToDto(Project project) {
        return ProjectDto.builder()
                .projectId(project.getProjectId())
                .name(project.getName())
                .description(project.getDescription())
                .ownerId(project.getOwner().getUserId())
                .createdAt(project.getCreatedAt().toString())
                .build();

    }

    // 매일 새벽 3시에 만료된 초대 코드 Soft Delete 처리
    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void cleanupExpiredInvitations() {
        LocalDateTime now = LocalDateTime.now();
        invitationRepository.markAsDeletedByExpiresAtBefore(now);
    }
}
