import { useEffect } from 'react';
import { useEditor } from './useEditor';

export const useAutoSave = (interval: number = 30000) => {
  const { content } = useEditor();

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Auto saving...', content);
      // Call API to save
    }, interval);

    return () => clearInterval(timer);
  }, [content, interval]);
};
