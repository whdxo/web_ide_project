import { useChatStore } from "../store/chatStore";

export function useChat() {
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);

  return {
    messages,
    sendMessage: (message: string) => {
      // 우선은 Mock
      addMessage({
        projectId: 1,
        sender: { id: 3, nickname: "EditUs" },
        message,
        sentAt: new Date().toISOString(),
      });
    },
  };
}
