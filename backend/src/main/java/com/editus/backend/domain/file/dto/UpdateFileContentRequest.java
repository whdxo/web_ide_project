package com.editus.backend.domain.file.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateFileContentRequest {

    @NotNull(message = "content는 필수입니다.")
    private String content;
}