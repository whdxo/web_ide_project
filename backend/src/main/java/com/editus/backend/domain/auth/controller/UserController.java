package com.editus.backend.domain.auth.controller;

import com.editus.backend.domain.auth.dto.*;
import com.editus.backend.domain.auth.service.UserService;
import com.editus.backend.global.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService; // 또는 UserService로 분리

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<UserResponse>> registerUser(@Valid @RequestBody UserJoinDto dto) {
        log.info("회원가입 요청: email={}", dto.getEmail());
        UserResponse userResponse = userService.joinUser(dto);
        return ResponseEntity.ok(ApiResponse.success(userResponse));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication authentication) {
        log.info("사용자 정보 조회: email={}", authentication.getName());
        UserResponse userResponse = userService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success(userResponse));
    }

    @PutMapping("/me")  // 또는 /{user_id}
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @Valid @RequestBody UserUpdateDto dto, Authentication authentication) {
        log.info("회원 정보 수정 요청: email={}", authentication.getName());
        UserResponse userResponse = userService.updateUser(authentication.getName(), dto);
        return ResponseEntity.ok(ApiResponse.success(userResponse));
    }

    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse<String>> deleteUser(Authentication authentication) {
        log.info("회원 탈퇴 요청: email={}", authentication.getName());
        userService.deleteUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("회원 탈퇴가 완료되었습니다"));
    }
}