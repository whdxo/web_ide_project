package com.editus.backend.domain.chat.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@lombok.Builder
public class ChatMessage {

    private Long userCount; // 접속자 수 (PRESENCE 용)

    public enum MessageType {
        ENTER, TALK, QUIT, PRESENCE
    }

    private Long id; // 새로 추가! DB 저장 후 ID
    private MessageType type;
    private String roomId;
    private Long userId; // 사용자 ID
    private String sender;
    private String message;

    @com.fasterxml.jackson.annotation.JsonFormat(shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime sentAt; // 전송 시간
    @lombok.Builder.Default
    private Boolean isRead = false; // 읽음 여부 (Wrapper Class for null safety)
    @com.fasterxml.jackson.annotation.JsonFormat(shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime readAt; // 읽은 시간
}