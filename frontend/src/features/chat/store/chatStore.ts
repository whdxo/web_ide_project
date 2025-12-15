import { create } from 'zustand';
import type { ChatMessage } from '../types/chat.types';

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
