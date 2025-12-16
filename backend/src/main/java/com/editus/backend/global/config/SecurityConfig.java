package com.editus.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // WebSocket과 개발을 위해 CSRF 비활성화
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/ws-chat/**").permitAll() // WebSocket 엔드포인트 허용
                        .requestMatchers("/app/**").permitAll() // STOMP 메시지 엔드포인트 허용
                        .requestMatchers("/topic/**").permitAll() // STOMP 구독 엔드포인트 허용
                        .anyRequest().permitAll() // 개발 단계이므로 모든 요청 허용
                );

        return http.build();
    }
}
