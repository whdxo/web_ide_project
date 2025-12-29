package com.editus.backend.domain.project.service;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.domain.project.dto.CreateProjectRequest;
import com.editus.backend.domain.project.dto.ProjectDto;
import com.editus.backend.domain.project.entity.Invitation;
import com.editus.backend.domain.project.entity.Project;
import com.editus.backend.domain.project.entity.ProjectMember;
import com.editus.backend.domain.project.entity.Role;
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
import java.util.Map;
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

        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        Role requesterRole = resolveUserRole(project, requesterId);
        if (requesterRole != Role.OWNER) {
            throw new IllegalArgumentException("초대 링크 생성 권한이 없습니다. (OWNER 권한 필요)");
        }

        String code = UUID.randomUUID().toString().replace("-", "");

        int validHours = (expiresInHours != null && expiresInHours > 0) ? expiresInHours : 24;
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(validHours);

        Invitation invitation = Invitation.builder()
                .code(code)
                .project(project)
                .inviter(requester)
                .expiresAt(expiresAt)
                .used(false)
                .build();

        invitationRepository.save(invitation);
        return code;
    }

    public com.editus.backend.domain.project.dto.InvitationInfoResponse getInvitationInfo(String code) {
        Invitation invitation = invitationRepository.findByCodeAndDeletedFalse(code)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 초대 코드입니다."));

        if (!invitation.isValid()) {
            throw new IllegalArgumentException("만료되었거나 이미 사용된 초대 코드입니다.");
        }

        return com.editus.backend.domain.project.dto.InvitationInfoResponse.builder()
                .projectName(invitation.getProject().getName())
                .inviterName(invitation.getInviter().getName())
                .expiresAt(invitation.getExpiresAt())
                .build();
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

    /**
     * 프로젝트 나가기 (현재 사용자가 프로젝트에서 탈퇴)
     */
    @Transactional
    public void leaveProject(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));
        Role role = resolveUserRole(project, userId);
        if (role == null) {
            throw new IllegalArgumentException("프로젝트의 멤버가 아닙니다.");
        }

        if (role == Role.OWNER) {
            boolean hasOtherMembers = projectMemberRepository.existsByProject_ProjectIdAndUser_UserIdNot(projectId,
                    userId);
            if (hasOtherMembers) {
                throw new IllegalArgumentException("프로젝트 소유자는 프로젝트를 나갈 수 없습니다. 다른 멤버에게 소유권을 양도하거나 프로젝트를 삭제해주세요.");
            }

            projectMemberRepository.deleteByProject(project);
            projectRepository.delete(project);
            return;
        }

        ProjectMember member = projectMemberRepository.findByProject_ProjectIdAndUser_UserId(projectId, userId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트의 멤버가 아닙니다."));
        projectMemberRepository.delete(member);
    }

    // ==================== 프로젝트 CRUD 기능 ====================

    /**
     * 사용자별 프로젝트 목록 조회 (owner + 멤버로 참여한 프로젝트)
     */
    public List<ProjectDto> getProjectsByUserId(Long userId) {
        // 1. owner인 프로젝트
        List<Project> ownedProjects = projectRepository.findByOwnerUserId(userId);

        // 2. 멤버로 참여한 프로젝트
        List<ProjectMember> memberships = projectMemberRepository.findByUserUserId(userId);
        Map<Long, Role> roleByProjectId = memberships.stream()
                .collect(Collectors.toMap(
                        member -> member.getProject().getProjectId(),
                        ProjectMember::getRole,
                        (existing, replacement) -> existing));
        List<Project> memberProjects = memberships.stream()
                .map(ProjectMember::getProject)
                .collect(Collectors.toList());

        // 3. 합치기 (중복 제거)
        List<Project> allProjects = new java.util.ArrayList<>(ownedProjects);
        for (Project project : memberProjects) {
            if (!allProjects.contains(project)) {
                allProjects.add(project);
            }
        }

        return allProjects.stream()
                .map(project -> {
                    Role role = roleByProjectId.get(project.getProjectId());
                    if (role == null && project.getOwner().getUserId().equals(userId)) {
                        role = Role.OWNER;
                    }
                    return convertToDto(project, role);
                })
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

        // 프로젝트 생성 및 저장 (ID 생성을 위해 선저장)
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .owner(owner)
                .build();
        Project savedProject = projectRepository.saveAndFlush(project);

        // 오너를 프로젝트 멤버(OWNER 역할)로 추가
        ProjectMember ownerMember = ProjectMember.builder()
                .project(savedProject)
                .user(owner)
                .role(com.editus.backend.domain.project.entity.Role.OWNER)
                .build();
        projectMemberRepository.save(ownerMember);

        return convertToDto(savedProject, Role.OWNER);
    }

    /**
     * 프로젝트 단건 조회 (권한 검증)
     */
    public ProjectDto getProjectByIdWithAuth(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("프로젝트를 찾을 수 없습니다"));

        Role role = resolveUserRole(project, userId);
        if (role == null) {
            throw new ProjectAccessDeniedException("프로젝트에 접근할 권한이 없습니다");
        }

        return convertToDto(project, role);
    }

    /**
     * 프로젝트 삭제 (권한 검증)
     */
    @Transactional
    public void deleteProjectWithAuth(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("프로젝트를 찾을 수 없습니다"));

        Role role = resolveUserRole(project, userId);
        if (role != Role.OWNER) {
            throw new ProjectAccessDeniedException("프로젝트 삭제 권한이 없습니다. (OWNER 권한 필요)");
        }

        projectRepository.delete(project);
    }

    /**
     * 프로젝트 이름 검색 (사용자별 필터링)
     */
    public List<ProjectDto> searchProjects(Long userId, String keyword) {
        List<Project> projects = projectRepository.findByOwnerUserIdAndNameContaining(userId, keyword);
        return projects.stream()
                .map(project -> convertToDto(project, Role.OWNER))
                .collect(Collectors.toList());
    }

    /**
     * Entity -> DTO 변환
     */
    private ProjectDto convertToDto(Project project, Role currentUserRole) {
        boolean isOwner = currentUserRole == Role.OWNER;
        boolean isUser = currentUserRole == Role.USER;
        boolean canLeave = isUser;
        if (isOwner) {
            boolean hasOtherMembers = projectMemberRepository.existsByProject_ProjectIdAndUser_UserIdNot(
                    project.getProjectId(), project.getOwner().getUserId());
            canLeave = !hasOtherMembers;
        }
        return ProjectDto.builder()
                .projectId(project.getProjectId())
                .name(project.getName())
                .description(project.getDescription())
                .ownerId(project.getOwner().getUserId())
                .createdAt(project.getCreatedAt().toString())
                .currentUserRole(currentUserRole != null ? currentUserRole.name() : null)
                .canDelete(isOwner)
                .canInvite(isOwner)
                .canLeave(canLeave)
                .build();

    }

    private Role resolveUserRole(Project project, Long userId) {
        return projectMemberRepository.findByProject_ProjectIdAndUser_UserId(project.getProjectId(), userId)
                .map(ProjectMember::getRole)
                .orElseGet(() -> project.getOwner().getUserId().equals(userId) ? Role.OWNER : null);
    }

    // 매일 새벽 3시에 만료된 초대 코드 Soft Delete 처리
    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void cleanupExpiredInvitations() {
        LocalDateTime now = LocalDateTime.now();
        invitationRepository.markAsDeletedByExpiresAtBefore(now);
    }
}
