package com.editus.backend.domain.project.controller;

import com.editus.backend.domain.project.dto.CreateProjectRequest;
import com.editus.backend.domain.project.dto.ProjectDto;
import com.editus.backend.domain.project.dto.ProjectTreeResponseDto;
import com.editus.backend.domain.file.dto.FileNodeDto;
import com.editus.backend.global.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final List<ProjectDto> projects = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public ProjectController() {
        // 초기 더미 데이터
        projects.add(ProjectDto.builder()
                .projectId(idGenerator.getAndIncrement())
                .name("Demo Project")
                .description("This is a demo project")
                .ownerId(1L)
                .createdAt(LocalDateTime.now().toString())
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getProjects() {
        try {
            System.out.println("Requesting projects: " + projects);
            return ResponseEntity.ok(ApiResponse.success(projects));
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping
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

    @GetMapping("/{projectId}/tree")
    public ResponseEntity<ApiResponse<ProjectTreeResponseDto>> getProjectTree(@PathVariable Long projectId) {
        List<FileNodeDto> children = new ArrayList<>();
        children.add(new FileNodeDto(101L, "main.ts", "FILE", null));
        
        List<FileNodeDto> rootFolders = new ArrayList<>();
        rootFolders.add(new FileNodeDto(100L, "src", "FOLDER", children));
        rootFolders.add(new FileNodeDto(102L, "README.md", "FILE", null));

        ProjectTreeResponseDto treeData = new ProjectTreeResponseDto(projectId, "Project " + projectId, rootFolders);

        return ResponseEntity.ok(ApiResponse.success(treeData));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long projectId) {
        // TODO: 실제 DB 삭제 및 권한 체크 로직
        // 현재는 메모리 리스트에서 제거
        projects.removeIf(p -> p.getProjectId().equals(projectId));
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProject(@PathVariable Long projectId) {
        ProjectDto project = projects.stream()
                .filter(p -> p.getProjectId().equals(projectId))
                .findFirst()
                .orElse(null);
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    @GetMapping("/{projectId}/members")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getProjectMembers(@PathVariable Long projectId) {
        List<Map<String, Object>> members = new ArrayList<>();
        Map<String, Object> member = new HashMap<>();
        member.put("userId", 1L);
        member.put("name", "박영선");
        member.put("role", "OWNER");
        members.add(member);
        return ResponseEntity.ok(ApiResponse.success(members));
    }

    @PostMapping("/{projectId}/members")
    public ResponseEntity<ApiResponse<Void>> inviteMember(@PathVariable Long projectId, @RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @DeleteMapping("/{projectId}/members/{memberId}")
    public ResponseEntity<ApiResponse<Void>> removeMember(@PathVariable Long projectId, @PathVariable Long memberId) {
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/{projectId}/sprints")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getSprints(@PathVariable Long projectId) {
        List<Map<String, Object>> sprints = new ArrayList<>();
        Map<String, Object> sprint = new HashMap<>();
        sprint.put("sprintId", 1L);
        sprint.put("name", "Sprint 1");
        sprint.put("status", "IN_PROGRESS");
        sprints.add(sprint);
        return ResponseEntity.ok(ApiResponse.success(sprints));
    }

    @PostMapping("/{projectId}/sprints")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createSprint(@PathVariable Long projectId, @RequestBody Map<String, Object> request) {
        Map<String, Object> sprint = new HashMap<>();
        sprint.put("sprintId", 2L);
        sprint.put("name", request.get("name"));
        sprint.put("status", "PLANNED");
        return ResponseEntity.ok(ApiResponse.success(sprint));
    }
}
