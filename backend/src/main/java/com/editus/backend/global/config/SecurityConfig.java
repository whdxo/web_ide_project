package com.editus.backend.global.config;

import com.editus.backend.global.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final com.editus.backend.global.security.oauth.CustomOAuth2UserService customOAuth2UserService;
    private final com.editus.backend.global.security.oauth.OAuth2SuccessHandler oAuth2SuccessHandler;

    /**
     * 중요! PasswordEncoder Bean 정의
     * 이 Bean이 없으면 UserService에서 주입받을 수 없음
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // WebSocket 채팅 엔드포인트 (인증 불필요)
                        .requestMatchers("/ws-chat/**", "/app/**", "/topic/**").permitAll()

                        // Auth 관련 (인증 불필요)
                        .requestMatchers("/api/auth/login", "/api/auth/health").permitAll()

                        // User 관련 (회원가입만 인증 불필요)
                        .requestMatchers(HttpMethod.POST, "/api/users/join").permitAll()

                        // OAuth2 관련
                        .requestMatchers("/login/oauth2/**", "/oauth2/**").permitAll()

                        // Todo API 인증 없이 허용
                        .requestMatchers("/api/todos/**").permitAll()

                        // Code Execution API (인증 불필요)
                        .requestMatchers("/api/code/**").permitAll()

                        // 🚧 개발 단계: 전체 허용
                        .anyRequest().permitAll()

                // 🔒 운영 전환 시 인증 필수
                // .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService))
                        .successHandler(oAuth2SuccessHandler))
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @org.springframework.beans.factory.annotation.Value("${CORS_ORIGINS:}")
    private String corsOriginsEnv;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:3001");
        configuration.addAllowedOrigin("http://localhost:5173"); // Vite 개발 서버

        configuration.addAllowedOrigin("https://goormeditus.com"); // 운영 도메인

        // 환경변수에서 추가된 Origin 처리
        if (corsOriginsEnv != null && !corsOriginsEnv.isBlank()) {
            for (String origin : corsOriginsEnv.split(",")) {
                if (!origin.isBlank()) {
                    configuration.addAllowedOrigin(origin.trim());
                }
            }
        }

        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
