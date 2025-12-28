package com.editus.backend.domain.code.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 코드 실행 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeExecutionResponse {

    /**
     * 표준 출력 (stdout)
     */
    private String output;

    /**
     * 표준 에러 (stderr) 또는 컴파일 에러
     */
    private String error;

    /**
     * 종료 코드
     */
    private Integer exitCode;

    /**
     * 실행 상태
     * 예: Accepted, Wrong Answer, Time Limit Exceeded, Compilation Error
     */
    private String status;

    /**
     * 실행 시간 (초)
     */
    private Double time;
}