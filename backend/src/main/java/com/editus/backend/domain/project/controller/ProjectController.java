package com.editus.backend.domain.project.controller;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.domain.project.dto.*;
import com.editus.backend.domain.project.entity.Project;
import com.editus.backend.domain.project.entity.ProjectMember;
import com.editus.backend.domain.project.service.ProjectService;
import com.editus.backend.domain.file.dto.FileNodeDto;
import com.editus.backend.global.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProjectController {

    // HEAD dependencies
    private final ProjectService projectService;
    private final UserRepository userRepository;

    // Develop dependencies (Mocks)
    private final List<ProjectDto> projects = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    // Constructor for Mock Data (from Develop)
    // Note: RequiredArgsConstructor handles final fields.
    // projectService/userRepository must be injected.
    // The non-final fields (projects, idGenerator) are initialized inline.
    // However, existing code had a constructor for mock data init.
    // Since we are using @RequiredArgsConstructor for DI, we should use
    // @PostConstruct or inline init block for mocks if possible,
    // or just checking if list is empty.
    // Or we can manually remove final from mocks and use @PostConstruct?
    // Actually, `projects` is final and initialized inline. `idGenerator` too.
    // But we need to add the default item.
    // I'll add a @PostConstruct for that.

    @jakarta.annotation.PostConstruct
    public void initMockData() {
        if (projects.isEmpty()) {
            projects.add(ProjectDto.builder()
                    .projectId(idGenerator.getAndIncrement())
                    .name("Demo Project")
                    .description("This is a demo project")
                    .ownerId(1L)
                    .createdAt(LocalDateTime.now().toString())
                    .build());
        }
    }

    // Helper to get current user
    private User getCurrentUser(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "사용자 정보를 찾을 수 없습니다."));
    }

    // --- Develop Branch Endpoints (Updated paths to include /projects prefix due
    // to class level being /api) ---

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getProjects() {
        try {
            System.out.println("Requesting projects: " + projects);
            return ResponseEntity.ok(ApiResponse.success(projects));
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping("/projects")
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(@RequestBody CreateProjectRequest request) {
        ProjectDto newProject = ProjectDto.builder()
                .projectId(idGenerator.getAndIncrement())
                .name(request.getName())
                .description(request.getDescription())
                .ownerId(1L) // Mock user ID
                .createdAt(LocalDateTime.now().toString())
                .projectType(request.getProjectType())
                .build();

        projects.add(newProject);
        return ResponseEntity.ok(ApiResponse.success(newProject));
    }

<<<<<<< HEAD
    @GetMapping("/projects/{projectId}/tree")
=======
    // NOTE: 이 엔드포인트는 FileController의 getTree와 중복되어 주석 처리됨
    // FileController의 /api/projects/{projectId}/tree를 사용할 것
    /*
    @GetMapping("/{projectId}/tree")
>>>>>>> develop
    public ResponseEntity<ApiResponse<ProjectTreeResponseDto>> getProjectTree(@PathVariable Long projectId) {
        List<FileNodeDto> children = new ArrayList<>();
        children.add(new FileNodeDto(101L, "main.ts", "FILE", null));

        List<FileNodeDto> rootFolders = new ArrayList<>();
        rootFolders.add(new FileNodeDto(100L, "src", "FOLDER", children));
        rootFolders.add(new FileNodeDto(102L, "README.md", "FILE", null));

        ProjectTreeResponseDto treeData = new ProjectTreeResponseDto(projectId, "Project " + projectId, rootFolders);

        return ResponseEntity.ok(ApiResponse.success(treeData));
    }
    */

    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long projectId) {
        // TODO: 실제 DB 삭제 및 권한 체크 로직
        // 현재는 메모리 리스트에서 제거
        projects.removeIf(p -> p.getProjectId().equals(projectId));
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProject(@PathVariable Long projectId) {
        ProjectDto project = projects.stream()
                .filter(p -> p.getProjectId().equals(projectId))
                .findFirst()
                .orElse(null);
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    @GetMapping("/projects/{projectId}/sprints")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getSprints(@PathVariable Long projectId) {
        List<Map<String, Object>> sprints = new ArrayList<>();
        Map<String, Object> sprint = new HashMap<>();
        sprint.put("sprintId", 1L);
        sprint.put("name", "Sprint 1");
        sprint.put("status", "IN_PROGRESS");
        sprints.add(sprint);
        return ResponseEntity.ok(ApiResponse.success(sprints));
    }

    @PostMapping("/projects/{projectId}/sprints")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createSprint(@PathVariable Long projectId,
            @RequestBody Map<String, Object> request) {
        Map<String, Object> sprint = new HashMap<>();
        sprint.put("sprintId", 2L);
        sprint.put("name", request.get("name"));
        sprint.put("status", "PLANNED");
        return ResponseEntity.ok(ApiResponse.success(sprint));
    }

    // --- HEAD Branch Endpoints (Real Implementation) - Wrapped in ApiResponse ---

    // 1. 초대 링크 생성 (리더용)
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

    // 2. 초대 링크로 프로젝트 참여 (팀원용)
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

    // 3. 프로젝트 멤버 목록 조회 (Merged: Real Implementation replaces Mock)
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

    // 4. 멤버 삭제 (리더용) (Merged: Real Implementation replaces Mock)
    @DeleteMapping("/projects/{projectId}/members/{userId}")
    public ResponseEntity<ApiResponse<Void>> removeMember(
            @PathVariable Long projectId,
            @PathVariable Long userId,
            Principal principal) {

        User requester = getCurrentUser(principal);
        projectService.removeMember(projectId, userId, requester.getUserId());

        return ResponseEntity.ok(ApiResponse.success(null)); // 204 No Content with body is weird, using 200 with null
                                                             // wrapped or just noContent.
        // ApiResponse usually implies a body. I'll invoke success(null).
    }
}
