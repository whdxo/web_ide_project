package com.editus.backend.domain.project.service;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.domain.project.entity.Invitation;
import com.editus.backend.domain.project.entity.Project;
import com.editus.backend.domain.project.entity.ProjectMember;
import com.editus.backend.domain.project.repository.InvitationRepository;
import com.editus.backend.domain.project.repository.ProjectMemberRepository;
import com.editus.backend.domain.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.editus.backend.domain.project.dto.InvitationInfoResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
    // ... existing fields ...

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final com.editus.backend.domain.file.repository.FolderRepository folderRepository;
    private final com.editus.backend.domain.file.repository.IdeFileRepository ideFileRepository;
    private final com.editus.backend.domain.schedule.repository.TodoRepository todoRepository;
    private final com.editus.backend.domain.chat.repository.ChatMessageRepository chatMessageRepository;

    @Transactional
    public Project createProject(String name, String description, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Project project = Project.builder()
                .name(name)
                .description(description)
                .owner(owner)
                .build();

        project = projectRepository.save(project);

        // 오너를 프로젝트 멤버 목록에도 추가
        // 오너를 프로젝트 멤버 목록에도 추가
        ProjectMember ownerMember = ProjectMember.builder()
                .project(project)
                .user(owner)
                .role(com.editus.backend.domain.project.entity.Role.OWNER)
                .build();
        projectMemberRepository.save(ownerMember);

        return project;
    }

    public List<Project> getProjectsForUser(Long userId) {
        return projectRepository.findAllProjectsByUserId(userId);
    }

    public Project getProject(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));
    }

    @Transactional
    public String createInvitation(Long projectId, Long requesterId, Integer expiresInHours) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));

        if (!project.getOwner().getUserId().equals(requesterId)) {
            throw new IllegalArgumentException("초대 링크 생성 권한이 없습니다.");
        }

        // UUID 대신 8자리 대문자/숫자 조합 코드 생성
        String code = UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();

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
    public void deleteProject(Long projectId, Long ownerId) {
        Project project = getProject(projectId);

        if (!project.getOwner().getUserId().equals(ownerId)) {
            throw new IllegalArgumentException("프로젝트 삭제 권한이 없습니다.");
        }

        // 1. 관련 데이터 삭제 (외래 키 제약 조건 순서대로)
        // 1-1. To-do 삭제
        todoRepository.deleteByProjectProjectId(projectId);

        // 1-2. 파일 삭제
        ideFileRepository.deleteByProjectId(projectId);

        // 1-3. 폴더 삭제
        folderRepository.deleteByProjectId(projectId);

        // 1-4. 초대 삭제
        invitationRepository.deleteByProject(project);

        // 1-5. 프로젝트 멤버 삭제
        projectMemberRepository.deleteByProject(project);

        // 1-6. 채팅 메시지 삭제
        // 1-6. 채팅 메시지 삭제
        chatMessageRepository.deleteByRoomId(String.valueOf(projectId));

        // 2. 프로젝트 삭제
        projectRepository.delete(project);
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
        if (project.getOwner().getUserId().equals(userId)) {
            throw new IllegalArgumentException("이미 프로젝트의 멤버입니다 (오너).");
        }

        if (projectMemberRepository.existsByProject_ProjectIdAndUser_UserId(project.getProjectId(), user.getUserId())) {
            throw new IllegalArgumentException("이미 프로젝트의 멤버입니다.");
        }

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(user)
                .role(com.editus.backend.domain.project.entity.Role.USER) // 명시적 Role 설정
                .build();

        try {
            projectMemberRepository.save(member);
        } catch (Exception e) {
            // 상세 에러 로깅
            System.err.println("ProjectMember Save Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("프로젝트 멤버 저장 중 오류가 발생했습니다: " + e.getMessage());
        }

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

    public com.editus.backend.domain.project.dto.InvitationInfoResponse getInvitationInfo(String code) {
        Invitation invitation = invitationRepository.findValidInvitation(code, LocalDateTime.now())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않거나 만료된 초대 코드입니다."));

        return com.editus.backend.domain.project.dto.InvitationInfoResponse.builder()
                .projectName(invitation.getProject().getName())
                .inviterName(invitation.getInviter().getName())
                .expiresAt(invitation.getExpiresAt())
                .build();
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

    @Transactional
    public void removeMemberByMemberId(Long projectId, Long memberId, Long requesterId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));

        // 권한 확인: 오너만 삭제 가능
        // 단, 본인이 스스로 나가는 경우(self-leave)도 있을 수 있으므로 로직 검토 필요.
        // 여기서는 오너가 타인을 삭제하는 경우 or 본인이 나가는 경우를 분리하거나, 호출부에서 제어.
        // 요구사항: "일반 사용자는 사용자 초대, 프로젝트 나가기 가능"
        // 따라서 본인이면 나가기 허용, 오너면 타인 삭제 허용.

        ProjectMember member = projectMemberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("멤버를 찾을 수 없습니다."));

        if (!member.getProject().getProjectId().equals(projectId)) {
            throw new IllegalArgumentException("해당 프로젝트의 멤버가 아닙니다.");
        }

        boolean isSelf = member.getUser().getUserId().equals(requesterId);
        boolean isOwner = project.getOwner().getUserId().equals(requesterId);

        if (!isSelf && !isOwner) {
            throw new IllegalArgumentException("멤버 삭제 권한이 없습니다.");
        }

        // 오너는 스스로 나갈(삭제될) 수 없음 -> 프로젝트 삭제를 해야 함.
        if (project.getOwner().getUserId().equals(member.getUser().getUserId())) {
            throw new IllegalArgumentException("오너는 프로젝트를 나갈 수 없습니다. 프로젝트를 삭제해주세요.");
        }

        projectMemberRepository.delete(member);
    }

    // 매일 새벽 3시에 만료된 초대 코드 Soft Delete 처리
    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void cleanupExpiredInvitations() {
        LocalDateTime now = LocalDateTime.now();
        invitationRepository.markAsDeletedByExpiresAtBefore(now);
    }
}
