// hooks/useWebSocket.ts
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useChatStore } from "../store/chatStore";
import { ChatMessage } from "@/shared/features-types/chat.types";

export function useWebSocket() {
  const clientRef = useRef<Client | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/project.1", (message) => {
          const data: ChatMessage = JSON.parse(message.body);
          addMessage(data);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [addMessage]);

  const sendMessage = (text: string) => {
    clientRef.current?.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        projectId: 1,
        senderId: 3,
        message: text,
      }),
    });
  };

  return { sendMessage };
}
