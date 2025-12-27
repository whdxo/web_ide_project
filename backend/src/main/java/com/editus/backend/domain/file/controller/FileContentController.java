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

    @PostMapping("/{fileId}/upload-url")
    public UploadUrlResponse uploadUrl(@PathVariable Long fileId) {
        return fileContentService.uploadUrl(fileId);
    }

    @GetMapping("/{fileId}/content-url")
    public DownloadUrlResponse contentUrl(@PathVariable Long fileId) {
        return fileContentService.downloadUrl(fileId);
    }
}