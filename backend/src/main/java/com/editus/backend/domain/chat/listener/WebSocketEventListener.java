package com.editus.backend.domain.chat.listener;

import com.editus.backend.domain.chat.dto.ChatMessage;
import com.editus.backend.domain.chat.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final RedisPublisher redisPublisher;
    private final ChannelTopic topic;

    // RoomId -> Set of SessionIds
    private static final Map<String, Set<String>> roomSessions = new ConcurrentHashMap<>();
    // SessionId -> RoomId (fast lookup for disconnect)
    private static final Map<String, String> sessionRoom = new ConcurrentHashMap<>();

    @EventListener
    public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String destination = headerAccessor.getDestination();
        String sessionId = headerAccessor.getSessionId();

        if (destination != null && destination.startsWith("/topic/chat/room/")) {
            String roomId = destination.replace("/topic/chat/room/", "");

            roomSessions.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(sessionId);
            sessionRoom.put(sessionId, roomId);

            // Broadcast new count
            sendPresenceUpdate(roomId);
            log.info("User joined room: {}, Current count: {}", roomId, getMemberCount(roomId));
        }
    }

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();

        String roomId = sessionRoom.remove(sessionId);
        if (roomId != null) {
            Set<String> sessions = roomSessions.get(roomId);
            if (sessions != null) {
                sessions.remove(sessionId);
                if (sessions.isEmpty()) {
                    roomSessions.remove(roomId);
                }
            }

            // Broadcast new count
            sendPresenceUpdate(roomId);
            log.info("User left room: {}, Current count: {}", roomId, getMemberCount(roomId));
        }
    }

    private void sendPresenceUpdate(String roomId) {
        long count = getMemberCount(roomId);

        ChatMessage presenceMessage = ChatMessage.builder()
                .type(ChatMessage.MessageType.PRESENCE)
                .roomId(roomId)
                .sender("SYSTEM")
                .message(String.valueOf(count)) // Use message field for backward compatibility or simple debugging
                .userCount(count)
                .isRead(false)
                .build();

        redisPublisher.publish(topic, presenceMessage);
    }

    private long getMemberCount(String roomId) {
        Set<String> sessions = roomSessions.get(roomId);
        return sessions != null ? sessions.size() : 0;
    }
}
