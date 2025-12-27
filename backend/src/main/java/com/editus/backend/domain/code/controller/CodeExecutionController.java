package com.editus.backend.domain.code.controller;

import com.editus.backend.domain.code.dto.request.CodeExecutionRequest;
import com.editus.backend.domain.code.dto.response.CodeExecutionResponse;
import com.editus.backend.domain.code.service.CodeExecutionService;
import com.editus.backend.global.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 코드 실행 API 컨트롤러
 */
@Slf4j
@RestController
@RequestMapping("/api/code")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CodeExecutionController {

    private final CodeExecutionService codeExecutionService;

    /**
     * 코드 실행
     * POST /api/code/execute
     *
     * @param request 코드 실행 요청 (code, language, input)
     * @return 실행 결과 (output, error, status, time)
     */
    @PostMapping("/execute")
    public ResponseEntity<ApiResponse<CodeExecutionResponse>> executeCode(
            @Valid @RequestBody CodeExecutionRequest request
    ) {
        log.info("코드 실행 요청 - language: {}, code length: {}",
                request.getLanguage(), request.getCode().length());

        try {
            CodeExecutionResponse response = codeExecutionService.executeCode(request);

            log.info("코드 실행 완료 - status: {}, time: {}초",
                    response.getStatus(), response.getTime());

            return ResponseEntity.ok(ApiResponse.success(response));

        } catch (Exception e) {
            log.error("코드 실행 실패", e);
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("코드 실행 실패: " + e.getMessage()));
        }
    }
}
