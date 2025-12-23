export interface ChatSender {
  id: number;
  nickname: string;
}

export interface ChatMessage {
  projectId: number;
  sender: ChatSender;
  message: string;
  sentAt: string;
}

export interface SendChatMessage {
  projectId: number;
  senderId: number;
  message: string;
}

export interface ChatUser {
  id: number;
  nickname: string;
}
