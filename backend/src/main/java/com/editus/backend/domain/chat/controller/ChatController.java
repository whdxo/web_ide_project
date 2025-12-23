package com.editus.backend.domain.chat.controller;

import com.editus.backend.domain.chat.dto.ChatMessage;
import com.editus.backend.domain.chat.service.ChatService;
import com.editus.backend.domain.chat.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChannelTopic topic;
    private final ChatService chatService; // 새로 추가!

    /**
     * WebSocket으로 메시지 전송
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        // 입장 메시지 처리
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }

        // 1. DB에 메시지 저장
        ChatMessage savedMessage = chatService.saveMessage(message);

        // 2. Redis로 실시간 발행 (모든 서버에 전달)
        redisPublisher.publish(topic, savedMessage);
    }

    // ===== REST API 엔드포인트 =====

    // 과거 메시지 조회
    @GetMapping("/api/chat/room/{roomId}/messages")
    @ResponseBody
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.getMessages(roomId));
    }

    @PostMapping("/api/chat/message/{messageId}/read")
    @ResponseBody
    public ResponseEntity<Void> markAsRead(@PathVariable Long messageId) {
        chatService.markAsRead(messageId);
        return ResponseEntity.ok().build();
    }

    /**
     * 채팅방의 모든 메시지 읽음 처리 (REST API)
     */
    @PostMapping("/api/chat/room/{roomId}/read")
    @ResponseBody
    public ResponseEntity<Void> markRoomAsRead(@PathVariable String roomId) {
        chatService.markRoomAsRead(roomId);
        return ResponseEntity.ok().build();
    }

    // 안 읽은 메시지 개수 조회
    @GetMapping("/api/chat/room/{roomId}/unread-count")
    @ResponseBody
    public ResponseEntity<Long> getUnreadCount(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.getUnreadCount(roomId));
    }
}
