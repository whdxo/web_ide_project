package com.editus.backend.domain.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIReviewRequest {

    @NotBlank(message = "파일 이름은 필수입니다")
    private String fileName;

    @NotBlank(message = "파일 경로는 필수입니다")
    private String filePath;

    @NotBlank(message = "파일 내용은 필수입니다")
    private String fileContent;
}
