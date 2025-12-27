// hooks/useWebSocket.ts
import { useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { useChatStore } from "../store/chatStore";
import { ChatMessage } from "@/shared/features-types/chat.types";

interface UseWebSocketProps {
  projectId: number;
  username: string;
}

export function useWebSocket({ projectId, username }: UseWebSocketProps) {
  const clientRef = useRef<Client | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const roomId = projectId.toString();

  useEffect(() => {
    const client = new Client({
      brokerURL: import.meta.env.VITE_WS_URL || "ws://localhost:8080/ws-chat",
      reconnectDelay: 5000,
      onConnect: () => {
        // Subscribe to the project's chat room
        client.subscribe(`/topic/chat/room/${roomId}`, (message) => {
          const data: ChatMessage = JSON.parse(message.body);
          addMessage(data);
        });

        // Send ENTER message
        client.publish({
          destination: "/app/chat/message",
          body: JSON.stringify({
            roomId,
            sender: username,
            message: `${username}님이 입장하셨습니다.`,
            type: "ENTER",
          }),
        });
      },
      onDisconnect: () => {
        console.log("WebSocket disconnected");
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      // Send QUIT message before disconnecting
      if (clientRef.current?.connected) {
        clientRef.current.publish({
          destination: "/app/chat/message",
          body: JSON.stringify({
            roomId,
            sender: username,
            message: `${username}님이 퇴장하셨습니다.`,
            type: "QUIT",
          }),
        });
      }
      client.deactivate();
    };
  }, [projectId, username, roomId, addMessage]);

  const sendMessage = useCallback(
    (text: string) => {
      if (clientRef.current?.connected) {
        clientRef.current.publish({
          destination: "/app/chat/message",
          body: JSON.stringify({
            roomId,
            sender: username,
            message: text,
            type: "TALK",
          }),
        });
      }
    },
    [roomId, username]
  );

  return { sendMessage };
}
