package com.editus.backend.domain.file.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileDataDto {
    @JsonProperty("file_id")
    private Long fileId;
    @JsonProperty("project_id")
    private Long projectId;
    @JsonProperty("parent_folder_id")
    private Long parentFolderId;
    private String name;
    private String content;
    @JsonProperty("created_at")
    private String createdAt;
    @JsonProperty("updated_at")
    private String updatedAt;
}
