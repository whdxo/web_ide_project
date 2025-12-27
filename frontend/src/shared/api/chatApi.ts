import { apiClient } from './client';
import { ChatMessage } from '@/shared/features-types/chat.types';

export const chatApi = {
  /**
   * 채팅방의 과거 메시지 조회
   */
  getMessages: (roomId: string) =>
    apiClient.get<ChatMessage[]>(`/api/chat/room/${roomId}/messages`),

  /**
   * 특정 메시지 읽음 처리
   */
  markMessageAsRead: (messageId: number) =>
    apiClient.post(`/api/chat/message/${messageId}/read`),

  /**
   * 채팅방의 모든 메시지 읽음 처리
   */
  markRoomAsRead: (roomId: string) =>
    apiClient.post(`/api/chat/room/${roomId}/read`),

  /**
   * 안 읽은 메시지 개수 조회
   */
  getUnreadCount: (roomId: string) =>
    apiClient.get<number>(`/api/chat/room/${roomId}/unread-count`),
};
