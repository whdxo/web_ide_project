package com.editus.backend.domain.auth.service;

import com.editus.backend.domain.auth.dto.*;
import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.global.exception.UserNotFoundException;
import com.editus.backend.global.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional(readOnly = true)
    public LoginResponse loginUser(UserLoginDto dto) {
        log.info("로그인 시도: email={}", dto.getEmail());

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("이메일 또는 비밀번호가 올바르지 않습니다"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new UserNotFoundException("이메일 또는 비밀번호가 올바르지 않습니다");
        }

        String token = jwtTokenProvider.createToken(user.getEmail());

        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt());

        log.info("로그인 성공: email={}", dto.getEmail());
        return new LoginResponse(token, userInfo);
    }

    @Transactional
    public void changePassword(String email, PasswordChangeDto dto) {
        log.info("비밀번호 변경 시도: email={}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new UserNotFoundException("현재 비밀번호가 올바르지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        log.info("비밀번호 변경 완료: email={}", email);
    }

    public TokenRefreshResponse refreshToken(String email) {
        log.info("토큰 재발급 시도: email={}", email);

        // 사용자 존재 확인
        userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다"));

        // 새 토큰 발급
        String newToken = jwtTokenProvider.createToken(email);

        log.info("토큰 재발급 완료: email={}", email);

        return new TokenRefreshResponse(newToken, 86400); // 24시간 = 86400초
    }

}