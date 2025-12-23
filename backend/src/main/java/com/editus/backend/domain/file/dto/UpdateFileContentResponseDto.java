package com.editus.backend.domain.file.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateFileContentResponseDto {
    @JsonProperty("file_id")
    private Long fileId;
    @JsonProperty("updated_at")
    private String updatedAt;
}
