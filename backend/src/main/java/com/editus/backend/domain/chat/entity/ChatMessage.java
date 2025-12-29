package com.editus.backend.domain.chat.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_id", nullable = false)
    private String roomId;

    @Column(nullable = false)
    private String sender;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "message", nullable = false, length = 1000)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageType type;

    @Column(nullable = false)
    private LocalDateTime sentAt;

    // 읽음 여부 (기본값: false)
    @Builder.Default
    @Column(nullable = false)
    private boolean isRead = false;

    // 읽은 시간
    private LocalDateTime readAt;

    // 현재 접속자 수 (DB 저장 X)
    @Transient
    private Long userCount;

    public enum MessageType {
        ENTER, TALK, QUIT, PRESENCE
    }

    @PrePersist
    public void prePersist() {
        if (sentAt == null) {
            sentAt = LocalDateTime.now();
        }
    }
}