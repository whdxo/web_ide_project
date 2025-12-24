package com.editus.backend.domain.chat.repository;

import com.editus.backend.domain.chat.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // 특정 채팅방의 모든 메시지 조회 (최신순)
    List<ChatMessage> findByRoomIdOrderBySentAtDesc(String roomId);

    // 특정 채팅방의 안 읽은 메시지 개수
    @Query("SELECT COUNT(m) FROM ChatMessage m WHERE m.roomId = :roomId AND m.isRead = false")
    Long countUnreadMessages(@Param("roomId") String roomId);

    // 메시지를 읽음 처리
    @Modifying
    @Query("UPDATE ChatMessage m SET m.isRead = true, m.readAt = :readAt WHERE m.id = :messageId")
    void markAsRead(@Param("messageId") Long messageId, @Param("readAt") LocalDateTime readAt);

    // 채팅방의 모든 메시지를 읽음 처리
    @Modifying
    @Query("UPDATE ChatMessage m SET m.isRead = true, m.readAt = :readAt WHERE m.roomId = :roomId AND m.isRead = false")
    void markRoomAsRead(@Param("roomId") String roomId, @Param("readAt") LocalDateTime readAt);

}