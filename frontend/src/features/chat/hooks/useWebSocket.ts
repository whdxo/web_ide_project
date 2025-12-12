import { useEffect } from 'react';

export const useWebSocket = (url: string) => {
  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      console.log('Connected');
    };

    return () => {
      ws.close();
    };
  }, [url]);
};
