package com.editus.backend.global.exception;

import com.editus.backend.global.common.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserNotFoundException(UserNotFoundException e) {
        log.error("사용자를 찾을 수 없음: {}", e.getMessage());
        return ResponseEntity.status(404)
                .body(ApiResponse.notFound(e.getMessage()));
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateEmailException(DuplicateEmailException e) {
        log.error("중복된 이메일: {}", e.getMessage());
        return ResponseEntity.status(409)
                .body(ApiResponse.conflict(e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        log.error("입력 검증 실패: {}", errors);
        return ResponseEntity.status(400)
                .body(ApiResponse.badRequest("입력값이 올바르지 않습니다"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception e) {
        log.error("예상치 못한 오류: {}", e.getMessage(), e);
        return ResponseEntity.status(500)
                .body(ApiResponse.error("서버 내부 오류가 발생했습니다"));
    }
}