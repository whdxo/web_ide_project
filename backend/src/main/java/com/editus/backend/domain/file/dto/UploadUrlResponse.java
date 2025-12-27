package com.editus.backend.domain.file.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UploadUrlResponse {
    private final String uploadUrl;
    private final String contentKey;
}