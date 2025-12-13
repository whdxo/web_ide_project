import { useEffect, useRef } from 'react';
import { useEditor } from './useEditor';

export const useAutoSave = (interval: number = 30000) => {
  const { content } = useEditor();

  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Auto saving...', contentRef.current);
      // Call API to save
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);
};
