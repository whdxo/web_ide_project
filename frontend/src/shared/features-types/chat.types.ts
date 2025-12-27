// Chat message types matching backend DTO

export type MessageType = "ENTER" | "TALK" | "QUIT";

export interface ChatMessage {
  id?: number;
  roomId: string;
  sender: string;
  message: string;
  type: MessageType;
  sentAt?: string;
  isRead?: boolean;
  readAt?: string;
}

export interface SendChatMessage {
  roomId: string;
  sender: string;
  message: string;
  type: MessageType;
}

// Legacy types for backward compatibility
export interface ChatSender {
  id: number;
  nickname: string;
}

export interface ChatUser {
  id: number;
  nickname: string;
}
