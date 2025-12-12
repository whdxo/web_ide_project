import { useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  
  const sendMessage = (text: string) => {
    // Logic to send message
  };

  return { messages, sendMessage };
};
