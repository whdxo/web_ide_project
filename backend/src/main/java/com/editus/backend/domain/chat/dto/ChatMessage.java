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
public class ChatMessage {

    public enum MessageType {
        ENTER, TALK, QUIT
    }

    private Long id; // 새로 추가! DB 저장 후 ID
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;

    private LocalDateTime sentAt; // 전송 시간
    private boolean isRead; // 읽음 여부
    private LocalDateTime readAt; // 읽은 시간
}