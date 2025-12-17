import { useState } from 'react';

export const useChat = () => {
  const [messages] = useState([]);
  
  const sendMessage = (text: string) => {
    setMessages(prevMessages => [...prevMessages, { text }]);
  };

  return { messages, sendMessage };
};
