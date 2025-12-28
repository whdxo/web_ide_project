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
      connectHeaders: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      onConnect: () => {
        console.log('STOMP Connected');
        // Subscribe to room topic
        client.subscribe(`/topic/chat/room/${projectId}`, (message) => {
          console.log('🔴 [1] Raw message received:', message);

          try {
            const receivedMessage = JSON.parse(message.body);
            console.log('🟡 [2] Parsed data:', receivedMessage);
            console.log('🟡 [2.1] Message type:', receivedMessage.type);

            if (receivedMessage.type === 'PRESENCE') {
              console.log('🔵 [3] PRESENCE message - updating count');
              useChatStore.getState().setOnlineCount(receivedMessage.userCount || 0);
            } else if (receivedMessage.type === 'TALK' || receivedMessage.type === 'ENTER') {
              console.log('🟢 [3] TALK/ENTER message - adding to state');
              console.log('🟢 [3.1] Message content:', receivedMessage);
              addMessage(receivedMessage);
              // Check current state after add (next tick effectively)
              setTimeout(() => {
                console.log('🟢 [4] Current messages count:', useChatStore.getState().messages.length);
              }, 100);
            } else {
              console.log('⚪ [3] Unknown message type:', receivedMessage.type);
            }
          } catch (e) {
            console.error('❌ Error parsing message:', e);
          }
        });
      },
      onStompError: (frame) => {
        console.error('[STOMP] Broker error:', frame.headers['message']);
        console.error('[STOMP] Details:', frame.body);
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

    console.log('[STOMP] Sending message:', chatMessage);
    clientRef.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify(chatMessage),
    });
  }, [projectId, user]);

  useEffect(() => {
    // Only connect if we have valid user and projectId
    if (user && projectId) {
      connect();

      // Fetch initial messages
      fetch(`/api/chat/room/${projectId}/messages`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch messages');
          return res.json();
        })
        .then(data => {
          console.log('📜 Initial messages loaded:', data);
          useChatStore.getState().setMessages(data);
        })
        .catch(err => console.error('❌ Error fetching messages:', err));
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
