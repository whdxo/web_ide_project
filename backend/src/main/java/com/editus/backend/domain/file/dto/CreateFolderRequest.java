package com.editus.backend.domain.file.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateFolderRequest {

    @NotBlank(message = "폴더명(name)은 필수입니다.")
    private String name;

    // 루트 폴더면 null
    private Long parentId;
}