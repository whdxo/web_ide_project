package com.editus.backend.domain.ai.dto;

import com.editus.backend.domain.ai.entity.AIReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIReviewHistoryResponse {

    private Long id;
    private String fileName;
    private Integer score;
    private String summary;
    private LocalDateTime createdAt;

    public static AIReviewHistoryResponse from(AIReview review) {
        return AIReviewHistoryResponse.builder()
                .id(review.getId())
                .fileName(review.getFileName())
                .score(review.getScore())
                .summary(review.getSummary())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
