package com.editus.backend.domain.chat.controller;

import com.editus.backend.domain.chat.dto.ChatMessage;
import com.editus.backend.domain.chat.service.ChatService;
import com.editus.backend.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final org.springframework.messaging.simp.SimpMessagingTemplate messagingTemplate; // Inject Template
    private final ChatService chatService;

    // RedisPublisher is not used directly here for now to isolate issues,
    // but ChatService might use it? No, ChatService is DB only.
    // If we want multi-server in future, we need Redis.
    // For now, let's use Template to fix the "No Response" issue.

    /**
     * WebSocket으로 메시지 전송
     */
    @MessageMapping("/chat/message")
    public void message(@org.springframework.messaging.handler.annotation.Payload ChatMessage message) {
        try {
            System.out.println("=== MESSAGE RECEIVED ===");
            System.out.println("Type: " + message.getType());
            System.out.println("RoomId: " + message.getRoomId());
            System.out.println("Sender: " + message.getSender());
            System.out.println("Message: " + message.getMessage());
            System.out.println("========================");

            // 0. User ID 설정 (DB 저장 필수 값)
            if (message.getUserId() == null) {
                // 시큐리티 컨텍스트에서 조회 시도
                org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder
                        .getContext().getAuthentication();

                if (auth != null && auth.getName() != null && !auth.getName().equals("anonymousUser")) {
                    try {
                        // username이 ID(Long)인 경우
                        message.setUserId(Long.parseLong(auth.getName()));
                    } catch (NumberFormatException e) {
                        // username이 닉네임 문자열인 경우.. 현재는 임시로 1L 할당 (추후 UserDetails에서 ID 추출 로직 필요)
                        message.setUserId(1L);
                    }
                } else {
                    // 인증 정보 없음 - 임시 할당 (개발용)
                    message.setUserId(1L);
                }
            }

            // 입장 메시지 처리
            if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
                message.setMessage(message.getSender() + "님이 입장하셨습니다.");
            }

            // 1. DB에 메시지 저장
            try {
                ChatMessage savedMessage = chatService.saveMessage(message);
                message = savedMessage; // Use saved message with ID and timestamps
            } catch (Exception dbEx) {
                System.err.println("DB Save Failed: " + dbEx.getMessage());
                // Continue to broadcast even if DB fails?
                // Usually better to fail, but for debugging let's continue or rethrow.
                // Re-throwing to see error in client.
                throw dbEx;
            }

            // 2. Broadcast directly using SimpMessagingTemplate
            String destination = "/topic/chat/room/" + message.getRoomId();
            messagingTemplate.convertAndSend(destination, message);
            System.out.println("Message sent to destination: " + destination);

        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ===== REST API 엔드포인트 =====

    // 과거 메시지 조회
    @GetMapping("/api/chat/room/{roomId}/messages")
    @ResponseBody
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.getMessages(roomId));
    }

    // 특정 메시지 읽음 처리
    @PostMapping("/api/chat/message/{messageId}/read")
    @ResponseBody
    public ResponseEntity<Void> markAsRead(@PathVariable Long messageId) {
        chatService.markAsRead(messageId);
        return ResponseEntity.ok().build();
    }

    /**
     * 채팅방의 모든 메시지 읽음 처리
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
