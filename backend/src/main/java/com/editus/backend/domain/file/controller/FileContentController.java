package com.editus.backend.domain.file.controller;

import com.editus.backend.domain.file.dto.DownloadUrlResponse;
import com.editus.backend.domain.file.dto.UploadUrlResponse;
import com.editus.backend.domain.file.service.FileContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class FileContentController {

    private final FileContentService fileContentService;

    @PostMapping("/api/files/{fileId}/upload-url")
    public UploadUrlResponse createUploadUrl(@PathVariable Long fileId) {
        return fileContentService.createUploadUrl(fileId);
    }

    @GetMapping("/api/files/{fileId}/content-url")
    public DownloadUrlResponse createDownloadUrl(@PathVariable Long fileId) {
        return fileContentService.createDownloadUrl(fileId);
    }
}