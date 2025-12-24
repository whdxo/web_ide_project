package com.editus.backend.domain.ai.service;

import com.editus.backend.domain.ai.dto.AIReviewHistoryResponse;
import com.editus.backend.domain.ai.dto.AIReviewRequest;
import com.editus.backend.domain.ai.dto.AIReviewResponse;
import com.editus.backend.domain.ai.entity.AIReview;
import com.editus.backend.domain.ai.repository.AIReviewRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AIReviewService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.api.model}")
    private String model;

    private final AIReviewRepository reviewRepository;
    private final ObjectMapper objectMapper;
    private final WebClient.Builder webClientBuilder;

    // ⭐ 리뷰 요청 및 저장
    @Transactional
    public AIReviewResponse reviewCode(AIReviewRequest request) {
        // 1. 프롬프트 생성
        String prompt = buildPrompt(request.getFileName(), request.getFileContent());

        // 2. OpenAI API 호출
        String aiResponse = callOpenAI(prompt);

        // 3. 응답 파싱
        Map<String, Object> parsed = parseResponse(aiResponse);

        Integer score = (Integer) parsed.get("score");
        String summary = (String) parsed.get("summary");
        List<String> suggestions = (List<String>) parsed.get("suggestions");

        // 4. ⭐ DB에 저장
        AIReview review = AIReview.builder()
                .userId(1L) // 임시, 나중에 JWT에서 가져옴
                .fileName(request.getFileName())
                .filePath(request.getFilePath())
                .score(score)
                .summary(summary)
                .suggestions(toJson(suggestions)) // JSON 문자열로 변환
                .build();

        AIReview saved = reviewRepository.save(review);

        // 5. 응답 반환
        return AIReviewResponse.from(saved, suggestions);
    }

    // ⭐ 리뷰 이력 조회
    public List<AIReviewHistoryResponse> getReviewHistory(String filePath) {
        return reviewRepository.findTop10ByFilePathOrderByCreatedAtDesc(filePath)
                .stream()
                .map(AIReviewHistoryResponse::from)
                .toList();
    }

    // ⭐ 리뷰 상세 조회 (클릭 시)
    public AIReviewResponse getReviewDetail(Long reviewId) {
        AIReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰를 찾을 수 없습니다"));

        List<String> suggestions = fromJson(review.getSuggestions());
        return AIReviewResponse.from(review, suggestions);
    }

    // === 내부 메서드 ===

    private String buildPrompt(String fileName, String fileContent) {
        return String.format("""
                다음 %s 파일을 분석하여 JSON 형식으로 응답해주세요:

                1. score: 0-100점 사이의 코드 품질 점수
                2. summary: 한 줄 평가 (한국어, 50자 이내)
                3. suggestions: 보완할 점 3-5개 (한국어, 각 항목 간단명료하게)

                JSON 형식만 반환:
                {
                  "score": 85,
                  "summary": "전반적으로 잘 작성된 코드입니다.",
                  "suggestions": ["개선점1", "개선점2", "개선점3"]
                }

                코드:
                ```
                %s
                ```
                """, fileName, fileContent);
    }

    private String callOpenAI(String prompt) {
        WebClient webClient = webClientBuilder.build();

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", "당신은 코드 리뷰 전문가입니다."),
                        Map.of("role", "user", "content", prompt)),
                "temperature", 0.3);

        Map<String, Object> response = webClient.post()
                .uri(apiUrl)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List<Map<String, Object>> choices = (List) response.get("choices");
        Map<String, Object> message = (Map) choices.get(0).get("message");
        return (String) message.get("content");
    }

    private Map<String, Object> parseResponse(String aiResponse) {
        String jsonContent = extractJSON(aiResponse);

        try {
            return objectMapper.readValue(jsonContent, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("AI 응답 파싱 실패: " + e.getMessage());
        }
    }

    private String extractJSON(String content) {
        if (content.contains("```json")) {
            int start = content.indexOf("```json") + 7;
            int end = content.lastIndexOf("```");
            return content.substring(start, end).trim();
        }
        return content.trim();
    }

    // JSON 변환 헬퍼
    private String toJson(List<String> suggestions) {
        try {
            return objectMapper.writeValueAsString(suggestions);
        } catch (Exception e) {
            return "[]";
        }
    }

    private List<String> fromJson(String json) {
        try {
            return objectMapper.readValue(json, List.class);
        } catch (Exception e) {
            return List.of();
        }
    }
}
