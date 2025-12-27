package com.editus.backend.domain.ai.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_review")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AIReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 사용자 정보
    @Column(name = "user_id")
    private Long userId;  // 임시로 1L, 나중에 JWT에서 가져옴

    // 파일 정보
    @Column(nullable = false, length = 255)
    private String fileName;  // "UserService.java"

    @Column(nullable = false, length = 500)
    private String filePath;  // "/src/main/java/com/editus/UserService.java"

    // 리뷰 결과
    @Column(nullable = false)
    private Integer score;  // 0-100점

    @Column(nullable = false, length = 500)
    private String summary;  // 한 줄 평가

    @Column(columnDefinition = "TEXT")
    private String suggestions;  // JSON 배열: ["개선1", "개선2", "개선3"]

    // 타임스탬프
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
