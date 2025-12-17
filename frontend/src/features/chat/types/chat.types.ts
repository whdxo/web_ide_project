export interface ChatMessage {
  projectId: number;
  sender: {
    id: number;
    nickname: string;
  };
  message: string;
  sentAt: string;
}

export interface SendMessageRequest {
  projectId: number;
  senderId: number;
  message: string;
}
