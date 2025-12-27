package com.editus.backend.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * RestTemplate 설정
 * HTTP 요청을 보내기 위한 Spring Boot 유틸리티
 * Judge0 API 호출에 사용됨
 */
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        // HttpMessageConverter 설정
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();

        // String 컨버터 추가 (UTF-8)
        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter(StandardCharsets.UTF_8);
        messageConverters.add(stringConverter);

        // Jackson JSON 컨버터 추가
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        jsonConverter.setObjectMapper(new ObjectMapper());
        messageConverters.add(jsonConverter);

        restTemplate.setMessageConverters(messageConverters);

        return restTemplate;
    }
}
