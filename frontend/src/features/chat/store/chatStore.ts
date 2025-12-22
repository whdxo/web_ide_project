import { create } from "zustand";
import type { ChatUser, ChatMessage } from "../../../shared/features-types/chat.types";

interface ChatState {
  users: ChatUser[];
  messages: ChatMessage[];

  setUsers: (users: ChatUser[]) => void;
  addUser: (user: ChatUser) => void;
  removeUser: (userId: number) => void;

  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  users: [],
  messages: [],

  setUsers: (users) => set({ users }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
    })),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
