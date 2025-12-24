package com.editus.backend.domain.ai.controller;

import com.editus.backend.domain.ai.dto.AIReviewHistoryResponse;
import com.editus.backend.domain.ai.dto.AIReviewRequest;
import com.editus.backend.domain.ai.dto.AIReviewResponse;
import com.editus.backend.domain.ai.service.AIReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AIReviewController {

    private final AIReviewService aiReviewService;

    /**
     * AI 코드 리뷰 요청 및 저장
     * POST /api/ai/review
     */
    @PostMapping("/review")
    public ResponseEntity<?> reviewCode(@Valid @RequestBody AIReviewRequest request) {
        try {
            AIReviewResponse response = aiReviewService.reviewCode(request);

            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("data", response);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "AI 분석 중 오류가 발생했습니다: " + e.getMessage());

            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * 리뷰 이력 목록 조회 (리스트)
     * GET /api/ai/review/history?filePath=/src/main/...
     */
    @GetMapping("/review/history")
    public ResponseEntity<?> getReviewHistory(@RequestParam String filePath) {
        try {
            List<AIReviewHistoryResponse> history = aiReviewService.getReviewHistory(filePath);

            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("data", history);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "이력 조회 실패: " + e.getMessage());

            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * 리뷰 상세 조회 (클릭 시)
     * GET /api/ai/review/{id}
     */
    @GetMapping("/review/{id}")
    public ResponseEntity<?> getReviewDetail(@PathVariable Long id) {
        try {
            AIReviewResponse detail = aiReviewService.getReviewDetail(id);

            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("data", detail);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "리뷰 상세 조회 실패: " + e.getMessage());

            return ResponseEntity.status(404).body(error);
        }
    }
}
