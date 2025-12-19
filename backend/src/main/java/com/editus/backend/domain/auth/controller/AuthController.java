package com.editus.backend.domain.auth.controller;

import com.editus.backend.domain.auth.dto.*;
import com.editus.backend.domain.auth.service.AuthService;
import com.editus.backend.global.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody UserLoginDto dto) {
        log.info("로그인 요청: email={}", dto.getEmail());
        LoginResponse loginResponse = authService.loginUser(dto);
        return ResponseEntity.ok(ApiResponse.success(loginResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(Authentication authentication) {
        log.info("로그아웃 요청: email={}", authentication.getName());
        authService.logout(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("로그아웃 되었습니다"));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refreshToken(@RequestBody TokenRefreshRequest request) {
        log.info("토큰 재발급 요청");
        TokenRefreshResponse tokenRefreshResponse = authService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.success(tokenRefreshResponse));
    }

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @Valid @RequestBody PasswordChangeDto dto, Authentication authentication) {
        log.info("비밀번호 변경 요청: email={}", authentication.getName());
        authService.changePassword(authentication.getName(), dto);
        return ResponseEntity.ok(ApiResponse.success("비밀번호가 변경되었습니다"));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success("Auth API is running perfectly!"));
    }
}