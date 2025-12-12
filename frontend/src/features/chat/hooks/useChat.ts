import { useState } from 'react';

export const useChat = () => {
  const [messages] = useState([]);
  
  const sendMessage = (text: string) => {
    // Logic to send message
  };

  return { messages, sendMessage };
};
