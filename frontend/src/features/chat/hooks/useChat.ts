import { useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';

import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '@/features/auth/store/authStore';

export function useChat(projectId: number) {
  const clientRef = useRef<Client | null>(null);
  const { user } = useAuthStore();
  const { messages, addMessage } = useChatStore();

  const connect = useCallback(() => {
    if (!user || !projectId) return;

    if (clientRef.current?.active) {
      return;
    }

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('STOMP Connected');
        // Subscribe to room topic
        client.subscribe(`/topic/chat/room/${projectId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          addMessage(receivedMessage);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    clientRef.current = client;
  }, [projectId, user, addMessage]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!clientRef.current?.active || !user) return;

    const chatMessage = {
      type: 'TALK',
      roomId: String(projectId),
      sender: user.name,
      message: text,
      // sentAt and other fields are handled by backend or optional
    };

    clientRef.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify(chatMessage),
    });
  }, [projectId, user]);

  useEffect(() => {
    // Only connect if we have valid user and projectId
    if (user && projectId) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [connect, disconnect, user, projectId]);

  return {
    messages,
    sendMessage,
    isConnected: clientRef.current?.active
  };
}
