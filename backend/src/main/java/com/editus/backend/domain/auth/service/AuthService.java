package com.editus.backend.domain.auth.service;

import com.editus.backend.domain.auth.dto.*;
import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.global.exception.UserNotFoundException;
import com.editus.backend.global.security.jwt.JwtTokenProvider;
import com.editus.backend.global.security.jwt.RefreshToken;
import com.editus.backend.global.security.jwt.RefreshTokenRepository;
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
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional(readOnly = true)
    public LoginResponse loginUser(UserLoginDto dto) {
        log.info("로그인 시도: email={}", dto.getEmail());

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("이메일 또는 비밀번호가 올바르지 않습니다"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new UserNotFoundException("이메일 또는 비밀번호가 올바르지 않습니다");
        }

        // Access Token & Refresh Token 생성
        String accessToken = jwtTokenProvider.createAccessToken(user.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getEmail());

        // Refresh Token을 Redis에 저장 (기존 토큰이 있으면 덮어씀)
        refreshTokenRepository.deleteByEmail(user.getEmail()); // 기존 토큰 삭제
        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .token(refreshToken)
                .email(user.getEmail())
                .userId(user.getUserId())
                .build();
        refreshTokenRepository.save(refreshTokenEntity);

        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt());

        log.info("로그인 성공: email={}", dto.getEmail());
        return new LoginResponse(accessToken, refreshToken, userInfo);
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

    @Transactional
    public TokenRefreshResponse refreshToken(String refreshToken) {
        log.info("토큰 재발급 시도");

        // 1. Refresh Token 유효성 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException("유효하지 않은 Refresh Token입니다");
        }

        // 2. Redis에서 Refresh Token 조회
        RefreshToken storedToken = refreshTokenRepository.findById(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("저장된 Refresh Token이 없습니다"));

        String email = storedToken.getEmail();

        // 3. 기존 Refresh Token 삭제 (Rotation)
        refreshTokenRepository.delete(storedToken);

        // 4. 새로운 Access Token & Refresh Token 생성
        String newAccessToken = jwtTokenProvider.createAccessToken(email);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(email);

        // 5. 새 Refresh Token을 Redis에 저장
        RefreshToken newRefreshTokenEntity = RefreshToken.builder()
                .token(newRefreshToken)
                .email(email)
                .userId(storedToken.getUserId())
                .build();
        refreshTokenRepository.save(newRefreshTokenEntity);

        log.info("토큰 재발급 완료: email={}", email);

        return new TokenRefreshResponse(newAccessToken, newRefreshToken, 1800); // 30분 = 1800초
    }

    @Transactional
    public void logout(String email) {
        log.info("로그아웃 시도: email={}", email);

        // Redis에서 Refresh Token 삭제
        refreshTokenRepository.deleteByEmail(email);

        log.info("로그아웃 완료: email={}", email);
    }
}