package com.editus.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // WebSocket 채팅 엔드포인트 (인증 불필요)
                        .requestMatchers("/ws-chat/**", "/app/**", "/topic/**").permitAll()
                        // Auth 관련 (인증 불필요)
                        .requestMatchers("/api/auth/login", "/api/auth/health").permitAll()
                        // User 관련 (회원가입만 인증 불필요)
                        .requestMatchers(HttpMethod.POST, "/api/users/join").permitAll()
                        // 개발 단계이므로 나머지도 모두 허용 (TODO: 나중에 인증 추가)
                        .anyRequest().permitAll())
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:3001");
        configuration.addAllowedOrigin("http://localhost:5173"); // Vite 개발 서버

        // 운영환경 (나중에 추가)
        // configuration.addAllowedOrigin("https://your-s3-domain.com");
        // configuration.addAllowedOrigin("https://your-custom-domain.com");

        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
