package com.editus.backend.global.common.dto;
// TODO: 공통 응답 DTO

import lombok.*;

@RequiredArgsConstructor
@Getter
@Builder
public class ApiResponse<T> {
    private final boolean success;
    private final T data;
    private final String message;

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .message(null)
                .build();
    }

    public static <T> ApiResponse<T> success(String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(null)
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .data(null)
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> badRequest(String message) {
        return error(message);
    }

    public static <T> ApiResponse<T> unauthorized(String message) {
        return error(message);
    }

    public static <T> ApiResponse<T> notFound(String message) {
        return error(message);
    }

    public static <T> ApiResponse<T> conflict(String message) {
        return error(message);
    }
}
