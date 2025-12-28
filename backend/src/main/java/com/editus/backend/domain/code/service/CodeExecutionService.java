package com.editus.backend.domain.code.service;

import com.editus.backend.domain.code.dto.Judge0SubmissionRequest;
import com.editus.backend.domain.code.dto.request.CodeExecutionRequest;
import com.editus.backend.domain.code.dto.response.CodeExecutionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * 코드 실행 서비스
 * Judge0 API를 통해 코드를 안전하게 실행
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CodeExecutionService {

    private final RestTemplate restTemplate;

    @Value("${judge0.api.url}")
    private String apiUrl;

    @Value("${judge0.api.key}")
    private String apiKey;

    @Value("${judge0.api.host}")
    private String apiHost;

    /**
     * 코드 실행
     *
     * @param request 코드 실행 요청 (code, language, input)
     * @return 코드 실행 결과
     */
    public CodeExecutionResponse executeCode(CodeExecutionRequest request) {
        try {
            // 1. Judge0 요청 생성
            Judge0SubmissionRequest submission = Judge0SubmissionRequest.builder()
                    .sourceCode(request.getCode())
                    .languageId(getLanguageId(request.getLanguage()))
                    .stdin(request.getInput() != null ? request.getInput() : "")
                    .build();

            // 2. ObjectMapper로 JSON 문자열 생성
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(submission);

            // 3. 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-RapidAPI-Key", apiKey);
            headers.set("X-RapidAPI-Host", apiHost);
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 4. API 호출 (wait=true로 동기 실행)
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
            String url = apiUrl + "/submissions?base64_encoded=false&wait=true";

            log.info("Judge0 API 호출 시작 - language: {}, code length: {}",
                    request.getLanguage(), request.getCode().length());
            log.info("Judge0 제출 JSON: {}", jsonBody);
            log.info("Judge0 API URL: {}", url);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            log.info("Judge0 API 응답 받음 - status: {}", response.getStatusCode());

            // 4. 결과 파싱 및 반환
            Map<String, Object> result = response.getBody();
            return parseResponse(result);

        } catch (Exception e) {
            log.error("코드 실행 실패", e);
            throw new RuntimeException("코드 실행 중 오류 발생: " + e.getMessage());
        }
    }

    /**
     * Judge0 응답 파싱
     */
    private CodeExecutionResponse parseResponse(Map<String, Object> result) {
        String stdout = (String) result.get("stdout");
        String stderr = (String) result.get("stderr");
        String compileOutput = (String) result.get("compile_output");

        @SuppressWarnings("unchecked")
        Map<String, Object> status = (Map<String, Object>) result.get("status");
        String statusDesc = status != null ? (String) status.get("description") : "Unknown";

        Double time = result.get("time") != null
                ? Double.parseDouble(result.get("time").toString())
                : 0.0;

        Integer exitCode = status != null && status.get("id") != null
                ? Integer.parseInt(status.get("id").toString())
                : 0;

        return CodeExecutionResponse.builder()
                .output(stdout != null ? stdout : "")
                .error(stderr != null ? stderr : (compileOutput != null ? compileOutput : ""))
                .status(statusDesc)
                .time(time)
                .exitCode(exitCode)
                .build();
    }

    /**
     * 언어 이름 → Judge0 Language ID 변환
     *
     * Judge0 언어 ID 목록:
     * https://ce.judge0.com/#statuses-and-languages-language-get
     */
    private Integer getLanguageId(String language) {
        Map<String, Integer> languageMap = new HashMap<>();

        // 주요 언어
        languageMap.put("python", 71);        // Python 3.8.1
        languageMap.put("javascript", 63);    // JavaScript (Node.js 12.14.0)
        languageMap.put("java", 62);          // Java (OpenJDK 13.0.1)
        languageMap.put("cpp", 54);           // C++ (GCC 9.2.0)
        languageMap.put("c", 50);             // C (GCC 9.2.0)
        languageMap.put("typescript", 74);    // TypeScript (3.7.4)
        languageMap.put("ruby", 72);          // Ruby (2.7.0)
        languageMap.put("go", 60);            // Go (1.13.5)
        languageMap.put("rust", 73);          // Rust (1.40.0)
        languageMap.put("php", 68);           // PHP (7.4.1)

        Integer languageId = languageMap.get(language.toLowerCase());

        if (languageId == null) {
            log.warn("지원하지 않는 언어: {}. Python으로 기본 설정", language);
            return 71; // 기본값: Python
        }

        return languageId;
    }
}