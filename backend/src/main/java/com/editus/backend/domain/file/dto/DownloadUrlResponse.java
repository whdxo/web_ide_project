package com.editus.backend.domain.file.dto;

public record DownloadUrlResponse(
        Long fileId,
        String downloadUrl
) {}