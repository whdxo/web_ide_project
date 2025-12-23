package com.editus.backend.domain.chat.service;

import com.editus.backend.domain.chat.dto.ChatMessage;
import com.editus.backend.domain.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    /**
     * 메시지를 DB에 저장
     */
    @Transactional
    public ChatMessage saveMessage(ChatMessage message) {
        com.editus.backend.domain.chat.entity.ChatMessage entity = com.editus.backend.domain.chat.entity.ChatMessage
                .builder()
                .roomId(message.getRoomId())
                .sender(message.getSender())
                .message(message.getMessage())
                .type(com.editus.backend.domain.chat.entity.ChatMessage.MessageType.valueOf(message.getType().name()))
                .sentAt(LocalDateTime.now())
                .isRead(false)
                .build();

        com.editus.backend.domain.chat.entity.ChatMessage saved = chatMessageRepository.save(entity);

        // Entity를 DTO로 변환해서 리턴
        message.setId(saved.getId());
        message.setSentAt(saved.getSentAt());
        return message;
    }

    /**
     * 특정 채팅방의 과거 메시지 불러오기
     */
    @Transactional(readOnly = true)
    public List<ChatMessage> getMessages(String roomId) {
        List<com.editus.backend.domain.chat.entity.ChatMessage> entities = chatMessageRepository
                .findByRoomIdOrderBySentAtDesc(roomId);

        // Entity를 DTO로 변환
        return entities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 메시지 읽음 처리
     */
    @Transactional
    public void markAsRead(Long messageId) {
        chatMessageRepository.markAsRead(messageId, LocalDateTime.now());
    }

    /**
     * 채팅방의 모든 메시지 읽음 처리
     */
    @Transactional
    public void markRoomAsRead(String roomId) {
        chatMessageRepository.markRoomAsRead(roomId, LocalDateTime.now());
    }

    /**
     * 안 읽은 메시지 개수 조회
     */
    @Transactional(readOnly = true)
    public Long getUnreadCount(String roomId) {
        return chatMessageRepository.countUnreadMessages(roomId);
    }

    // Entity -> DTO 변환 헬퍼 메서드

    private ChatMessage convertToDto(com.editus.backend.domain.chat.entity.ChatMessage entity) {
        ChatMessage dto = new ChatMessage();
        dto.setId(entity.getId());
        dto.setRoomId(entity.getRoomId());
        dto.setSender(entity.getSender());
        dto.setMessage(entity.getMessage());
        dto.setType(ChatMessage.MessageType.valueOf(entity.getType().name()));
        dto.setSentAt(entity.getSentAt());
        dto.setRead(entity.isRead());
        dto.setReadAt(entity.getReadAt());
        return dto;
    }

}