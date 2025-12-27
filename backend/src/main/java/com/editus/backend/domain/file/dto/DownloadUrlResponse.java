package com.editus.backend.domain.file.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DownloadUrlResponse {
    private final String downloadUrl;
}