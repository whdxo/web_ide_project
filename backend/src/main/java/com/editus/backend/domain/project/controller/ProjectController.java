package com.editus.backend.domain.project.controller;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.domain.project.dto.*;
import com.editus.backend.domain.project.entity.Project;
import com.editus.backend.domain.project.entity.ProjectMember;
import com.editus.backend.domain.project.service.ProjectService;
import com.editus.backend.global.common.dto.ApiResponse;
import com.editus.backend.global.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    /**
     * 현재 로그인한 사용자 ID 조회 (Authentication 기반)
     */
    private Long getCurrentUserId(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다"));
        return user.getUserId();
    }

    /**
     * 현재 로그인한 사용자 조회 (Principal 기반)
     */
    private User getCurrentUser(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "사용자 정보를 찾을 수 없습니다."));
    }

    // ==================== 프로젝트 CRUD API ====================

    /**
     * 프로젝트 목록 조회 (현재 사용자의 프로젝트만)
     * GET /api/projects
     */
    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getProjects(Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        List<ProjectDto> projects = projectService.getProjectsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    /**
     * 프로젝트 생성 (현재 사용자가 owner)
     * POST /api/projects
     */
    @PostMapping("/projects")
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(
            @RequestBody CreateProjectRequest request,
            Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        ProjectDto newProject = projectService.createProject(userId, request);
        return ResponseEntity.ok(ApiResponse.success(newProject));
    }

    /**
     * 프로젝트 단건 조회 (권한 검증)
     * GET /api/projects/{projectId}
     */
    @GetMapping("/projects/{projectId}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProject(
            @PathVariable Long projectId,
            Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        ProjectDto project = projectService.getProjectByIdWithAuth(projectId, userId);
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    /**
     * 프로젝트 삭제 (권한 검증)
     * DELETE /api/projects/{projectId}
     */
    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(
            @PathVariable Long projectId,
            Authentication authentication) {
        Long userId = getCurrentUserId(authentication);
        projectService.deleteProjectWithAuth(projectId, userId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // ==================== 스프린트 API (추후 구현 예정) ====================

    /**
     * 프로젝트 스프린트 조회
     * TODO: 실제 스프린트 관리 기능 구현 필요
     */
    @GetMapping("/projects/{projectId}/sprints")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getSprints(
            @PathVariable Long projectId,
            Authentication authentication) {
        // TODO: 권한 검증 및 실제 스프린트 조회 로직 구현
        List<Map<String, Object>> sprints = new ArrayList<>();
        Map<String, Object> sprint = new HashMap<>();
        sprint.put("sprintId", 1L);
        sprint.put("name", "Sprint 1");
        sprint.put("status", "IN_PROGRESS");
        sprints.add(sprint);
        return ResponseEntity.ok(ApiResponse.success(sprints));
    }

    /**
     * 프로젝트 스프린트 생성
     * TODO: 실제 스프린트 생성 기능 구현 필요
     */
    @PostMapping("/projects/{projectId}/sprints")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createSprint(
            @PathVariable Long projectId,
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        // TODO: 권한 검증 및 실제 스프린트 생성 로직 구현
        Map<String, Object> sprint = new HashMap<>();
        sprint.put("sprintId", 2L);
        sprint.put("name", request.get("name"));
        sprint.put("status", "PLANNED");
        return ResponseEntity.ok(ApiResponse.success(sprint));
    }

    // ==================== 초대 및 멤버 관리 API ====================

    /**
     * 초대 링크 생성 (프로젝트 소유자용)
     * POST /api/projects/{projectId}/invitations
     */
    @PostMapping("/projects/{projectId}/invitations")
    public ResponseEntity<ApiResponse<InvitationResponse>> createInvitation(
            @PathVariable Long projectId,
            @RequestBody(required = false) InvitationCreateRequest request,
            Principal principal) {

        User user = getCurrentUser(principal);
        Integer expiresInHours = request != null ? request.getExpiresInHours() : null;

        String code = projectService.createInvitation(projectId, user.getUserId(), expiresInHours);

        int validHours = (expiresInHours != null && expiresInHours > 0) ? expiresInHours : 24;
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(validHours);
        String invitationUrl = "https://domain.com/invite/" + code; // 도메인은 임시

        InvitationResponse response = InvitationResponse.builder()
                .invitationUrl(invitationUrl)
                .code(code)
                .expiresAt(expiresAt)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    /**
     * 초대 링크로 프로젝트 참여 (팀원용)
     * POST /api/invitations/{code}/join
     */
    @PostMapping("/invitations/{code}/join")
    public ResponseEntity<ApiResponse<ProjectJoinResponse>> joinProject(
            @PathVariable String code,
            Principal principal) {

        User user = getCurrentUser(principal);
        Project project = projectService.joinProject(code, user.getUserId());

        ProjectJoinResponse response = ProjectJoinResponse.builder()
                .project(project)
                .success(true)
                .build();

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 프로젝트 멤버 목록 조회
     * GET /api/projects/{projectId}/members
     */
    @GetMapping("/projects/{projectId}/members")
    public ResponseEntity<ApiResponse<List<ProjectMemberResponse>>> getProjectMembers(
            @PathVariable Long projectId,
            Principal principal) {

        User user = getCurrentUser(principal);
        List<ProjectMember> members = projectService.getProjectMembers(projectId, user.getUserId());

        List<ProjectMemberResponse> response = members.stream()
                .map(pm -> ProjectMemberResponse.builder()
                        .userId(pm.getUser().getUserId())
                        .name(pm.getUser().getName())
                        .email(pm.getUser().getEmail())
                        .joinedAt(pm.getJoinedAt())
                        .isOwner(pm.getProject().getOwner().getUserId().equals(pm.getUser().getUserId()))
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 멤버 삭제 (프로젝트 소유자용)
     * DELETE /api/projects/{projectId}/members/{userId}
     */
    @DeleteMapping("/projects/{projectId}/members/{userId}")
    public ResponseEntity<ApiResponse<Void>> removeMember(
            @PathVariable Long projectId,
            @PathVariable Long userId,
            Principal principal) {

        User requester = getCurrentUser(principal);
        projectService.removeMember(projectId, userId, requester.getUserId());

        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
