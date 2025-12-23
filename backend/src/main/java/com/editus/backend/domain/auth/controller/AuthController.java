package com.editus.backend.domain.auth.controller;

import com.editus.backend.domain.auth.dto.LoginRequest;
import com.editus.backend.domain.auth.dto.LoginResponse;
import com.editus.backend.global.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        // TODO: 실제 인증 로직 구현 (현재는 Mock 응답)
        
        LoginResponse.UserDto user = LoginResponse.UserDto.builder()
                .userId(1L)
                .name("박영선")
                .email(request.getEmail())
                .createdAt(LocalDateTime.now().toString())
                .build();

        LoginResponse response = LoginResponse.builder()
                .accessToken("mock-access-token")
                .refreshToken("mock-refresh-token")
                .user(user)
                .build();

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh() {
        // Mock refresh
        LoginResponse.UserDto user = LoginResponse.UserDto.builder()
                .userId(1L)
                .name("박영선")
                .email("test@example.com")
                .createdAt(LocalDateTime.now().toString())
                .build();

        LoginResponse response = LoginResponse.builder()
                .accessToken("new-mock-access-token")
                .refreshToken("new-mock-refresh-token")
                .user(user)
                .build();
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<Void>> changePassword() {
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
