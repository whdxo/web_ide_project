package com.editus.backend.domain.file.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateFileRequest {

    @NotBlank(message = "파일명은 필수입니다.")
    private String name;

    @NotNull(message = "folderId는 필수입니다.")
    private Long folderId;

    @NotBlank(message = "language는 필수입니다.")
    private String language;

    private String content;
}