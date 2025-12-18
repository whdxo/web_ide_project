package com.editus.backend.domain.auth.service;

import com.editus.backend.domain.auth.dto.*;
import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.global.exception.DuplicateEmailException;
import com.editus.backend.global.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse joinUser(UserJoinDto dto) {
        log.info("회원가입 시도: email={}", dto.getEmail());

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateEmailException("이미 존재하는 이메일입니다");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setProvider("local"); // 일반 회원가입은 provider를 local로 설정

        User savedUser = userRepository.save(user);
        log.info("회원가입 완료: userId={}", savedUser.getUserId());

        return new UserResponse(
                savedUser.getUserId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getCreatedAt());
    }

    @Transactional
    public UserResponse updateUser(String email, UserUpdateDto dto) {
        log.info("회원 정보 수정 시도: email={}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다"));

        // 이름 업데이트
        user.setName(dto.getName());
        User updatedUser = userRepository.save(user);

        log.info("회원 정보 수정 완료: userId={}", updatedUser.getUserId());

        return new UserResponse(
                updatedUser.getUserId(),
                updatedUser.getName(),
                updatedUser.getEmail(),
                updatedUser.getCreatedAt());
    }

    @Transactional
    public void deleteUser(String email) {
        log.info("회원 탈퇴 시도:  email={}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        userRepository.delete(user);

        log.info("회원 탈퇴 완료: email={}", email);
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다"));

        return new UserResponse(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt());
    }
}