package com.editus.backend.domain.ai.repository;

import com.editus.backend.domain.ai.entity.AIReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AIReviewRepository extends JpaRepository<AIReview, Long> {

    // 특정 파일의 리뷰 이력 조회 (최신순, 최대 10개)
    List<AIReview> findTop10ByFilePathOrderByCreatedAtDesc(String filePath);

    // 사용자별 리뷰 이력 (나중에 JWT 완성되면 사용)
    List<AIReview> findTop10ByUserIdAndFilePathOrderByCreatedAtDesc(Long userId, String filePath);

    // 전체 리뷰 이력 (관리자용)
    List<AIReview> findAllByOrderByCreatedAtDesc();
}
