package com.editus.backend.domain.file.controller;

import com.editus.backend.domain.file.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api")
public class FileController {

    private final AtomicLong fileIdGenerator = new AtomicLong(1000);

    @PostMapping("/projects/{projectId}/folders")
    public ResponseEntity<Map<String, Object>> createFolder(@PathVariable Long projectId, @RequestBody CreateFolderRequestDto request) {
        FileDataDto folder = FileDataDto.builder()
                .fileId(fileIdGenerator.getAndIncrement())
                .projectId(projectId)
                .parentFolderId(request.getParentFolderId())
                .name(request.getName())
                .content(null)
                .createdAt(LocalDateTime.now().toString())
                .updatedAt(LocalDateTime.now().toString())
                .build();

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", folder);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/projects/{projectId}/folders/{folderId}")
    public ResponseEntity<Map<String, Object>> deleteFolder(@PathVariable Long projectId, @PathVariable Long folderId) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/projects/{projectId}/files")
    public ResponseEntity<Map<String, Object>> createFile(@PathVariable Long projectId, @RequestBody CreateFileRequestDto request) {
        FileDataDto file = FileDataDto.builder()
                .fileId(fileIdGenerator.getAndIncrement())
                .projectId(projectId)
                .parentFolderId(request.getParentFolderId())
                .name(request.getName())
                .content(request.getContent())
                .createdAt(LocalDateTime.now().toString())
                .updatedAt(LocalDateTime.now().toString())
                .build();

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/projects/{projectId}/files/{fileId}")
    public ResponseEntity<Map<String, Object>> deleteFile(@PathVariable Long projectId, @PathVariable Long fileId) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/files/{fileId}")
    public ResponseEntity<Map<String, Object>> getFileContent(@PathVariable Long fileId) {
        // Return dummy content
        Map<String, Object> data = new HashMap<>();
        data.put("content", "// This is a mock file content for file " + fileId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/files/{fileId}")
    public ResponseEntity<Map<String, Object>> updateFileContent(@PathVariable Long fileId, @RequestBody UpdateFileContentRequestDto request) {
        UpdateFileContentResponseDto data = UpdateFileContentResponseDto.builder()
                .fileId(fileId)
                .updatedAt(LocalDateTime.now().toString())
                .build();

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
