package com.editus.backend.domain.ai.dto;

import com.editus.backend.domain.ai.entity.AIReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIReviewResponse {

    private Long id;
    private Integer score;           // 0-100점
    private String summary;          // 간단한 평가
    private List<String> suggestions;  // 보완점 리스트
    private LocalDateTime createdAt;

    public static AIReviewResponse from(AIReview review, List<String> suggestions) {
        return AIReviewResponse.builder()
                .id(review.getId())
                .score(review.getScore())
                .summary(review.getSummary())
                .suggestions(suggestions)
                .createdAt(review.getCreatedAt())
                .build();
    }
}
