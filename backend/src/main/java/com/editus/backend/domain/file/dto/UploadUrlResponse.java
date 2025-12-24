package com.editus.backend.domain.file.dto;

public record UploadUrlResponse(
        Long fileId,
        String contentKey,
        String uploadUrl
) {}