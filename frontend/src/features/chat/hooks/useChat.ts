import { useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  
  const sendMessage = (text: string) => {
    setMessages(prevMessages => [...prevMessages, { text }]);
  };

  return { messages, sendMessage };
};
