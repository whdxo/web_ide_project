package com.editus.backend.domain.code.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 코드 실행 요청 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CodeExecutionRequest {

    /**
     * 실행할 코드
     */
    @NotBlank(message = "코드는 필수입니다")
    private String code;

    /**
     * 프로그래밍 언어
     * 예: python, javascript, java, cpp, c
     */
    @NotBlank(message = "언어는 필수입니다")
    private String language;

    /**
     * 표준 입력 (stdin)
     * 선택 사항
     */
    private String input;
}
