// import { useEffect, useRef, useState, useCallback } from 'react';

// export interface WebSocketHook<T = any> {
//   sendMessage: (msg: string) => void;
//   lastMessage: T | null;
//   readyState: number;
//   error: Event | null;
// }

// export const useWebSocket = <T = any>(url: string): WebSocketHook<T> => {
//   const wsRef = useRef<WebSocket | null>(null);
//   const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
//   const [lastMessage, setLastMessage] = useState<T | null>(null);
//   const [error, setError] = useState<Event | null>(null);

//   const sendMessage = useCallback((msg: string) => {
//     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//       wsRef.current.send(msg);
//     }
//   }, []);

//   useEffect(() => {
//     const ws = new WebSocket(url);
//     wsRef.current = ws;
//     setReadyState(WebSocket.CONNECTING);
//     setError(null);

//     ws.onopen = () => {
//       setReadyState(WebSocket.OPEN);
//       // Optionally: console.log('Connected');
//     };

//     ws.onmessage = (event: MessageEvent) => {
//       try {
//         setLastMessage(event.data);
//       } catch (e) {
//         // If parsing is needed, handle here
//         setLastMessage(event.data);
//       }
//     };

//     ws.onerror = (event: Event) => {
//       setError(event);
//       setReadyState(ws.readyState);
//     };

//     ws.onclose = () => {
//       setReadyState(WebSocket.CLOSED);
//     };

//     return () => {
//       ws.close();
//     };
//   }, [url]);

//   return {
//     sendMessage,
//     lastMessage,
//     readyState,
//     error,
//   };
// };


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
