package com.editus.backend.domain.file.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateFileRequestDto {
    private String name;
    private String content;
    @JsonProperty("parent_folder_id")
    private Long parentFolderId;
}
