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

        // Helper to get current user
        private User getCurrentUser(Principal principal) {
                if (principal == null) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
                }
                return userRepository.findByEmail(principal.getName())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                                                "사용자 정보를 찾을 수 없습니다."));
        }

        // 4. 프로젝트 목록 조회
        @GetMapping("/projects")
        public ResponseEntity<ApiResponse<List<ProjectDto>>> getProjects(Principal principal) {
                User user = getCurrentUser(principal);
                List<Project> projects = projectService.getProjectsForUser(user.getUserId());

                List<ProjectDto> projectDtos = projects.stream()
                                .map(p -> ProjectDto.builder()
                                                .projectId(p.getProjectId())
                                                .name(p.getName())
                                                .description(p.getDescription())
                                                .ownerId(p.getOwner().getUserId())
                                                .createdAt(p.getCreatedAt().toString())
                                                // .projectType(p.getProjectType()) // Project entity might not have
                                                // projectType
                                                // yet, check entity
                                                .build())
                                .collect(Collectors.toList());

                return ResponseEntity.ok(ApiResponse.success(projectDtos));
        }

        // 5. 프로젝트 생성
        @PostMapping("/projects")
        public ResponseEntity<ApiResponse<ProjectDto>> createProject(
                        @RequestBody CreateProjectRequest request,
                        Principal principal) {

                User user = getCurrentUser(principal);
                Project project = projectService.createProject(request.getName(), request.getDescription(),
                                user.getUserId());

                ProjectDto response = ProjectDto.builder()
                                .projectId(project.getProjectId())
                                .name(project.getName())
                                .description(project.getDescription())
                                .ownerId(project.getOwner().getUserId())
                                .createdAt(project.getCreatedAt().toString())
                                // .projectType(request.getProjectType())
                                .build();

                return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
        }

        // 6. 프로젝트 삭제 (Real Implementation)
        @DeleteMapping("/projects/{projectId}")
        public ResponseEntity<ApiResponse<Void>> deleteProject(
                        @PathVariable Long projectId,
                        Principal principal) {

                User user = getCurrentUser(principal);
                projectService.deleteProject(projectId, user.getUserId());
                return ResponseEntity.ok(ApiResponse.success(null));
        }

        // NOTE: 이 엔드포인트는 FileController의 getTree와 중복되어 주석 처리됨
        // FileController의 /api/projects/{projectId}/tree를 사용할 것
        /*
         * @GetMapping("/projects/{projectId}/tree")
         * public ResponseEntity<ApiResponse<ProjectTreeResponseDto>>
         * getProjectTree(@PathVariable Long projectId) {
         * List<FileNodeDto> children = new ArrayList<>();
         * children.add(new FileNodeDto(101L, "main.ts", "FILE", null));
         * 
         * List<FileNodeDto> rootFolders = new ArrayList<>();
         * rootFolders.add(new FileNodeDto(100L, "src", "FOLDER", children));
         * rootFolders.add(new FileNodeDto(102L, "README.md", "FILE", null));
         * 
         * ProjectTreeResponseDto treeData = new ProjectTreeResponseDto(projectId,
         * "Project " + projectId, rootFolders);
         * 
         * return ResponseEntity.ok(ApiResponse.success(treeData));
         * }
         */

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

        @GetMapping("/projects/invitations/{code}")
        public ResponseEntity<ApiResponse<InvitationInfoResponse>> getInvitationInfo(@PathVariable String code) {
                InvitationInfoResponse response = projectService.getInvitationInfo(code);
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
                                                // .isOwner(...) Remove this
                                                .role(pm.getRole().name())
                                                .build())
                                .collect(Collectors.toList());

                return ResponseEntity.ok(ApiResponse.success(response));
        }

        // 4. 멤버 삭제 (리더용) (Merged: Real Implementation replaces Mock)
        // 4. 멤버 삭제 (리더용) (Merged: Real Implementation replaces Mock)
        @DeleteMapping("/projects/{projectId}/members/{memberId}")
        public ResponseEntity<ApiResponse<Void>> removeMember(
                        @PathVariable Long projectId,
                        @PathVariable Long memberId,
                        Principal principal) {

                User requester = getCurrentUser(principal);
                projectService.removeMemberByMemberId(projectId, memberId, requester.getUserId());

                return ResponseEntity.ok(ApiResponse.success(null));
        }
}
