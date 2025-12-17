package com.editus.backend.domain.file.controller;

import org.springframework.web.bind.annotation.*;
import com.editus.backend.domain.file.dto.CreateFileRequest;
import com.editus.backend.domain.file.dto.FileResponse;
import com.editus.backend.domain.file.service.FileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FileController {
    // TODO: 김민규 - 파일 CRUD API 구현

    private final FileService fileService;
    // 1) 파일 생성
    @PostMapping("/projects/{projectId}/files")
    public FileResponse createFile(@PathVariable Long projectId,
                                   @RequestBody CreateFileRequest req) {
        return fileService.createFile(projectId, req);
    }

    // 2) 파일 조회
    @GetMapping("/files/{fileId}")
    public FileResponse getFile(@PathVariable Long fileId) {
        return fileService.getFile(fileId);
    }
}
