import { useEffect, useRef } from 'react';
import { useEditorStore } from '../store/editorStore';
import { useSaveFile } from './useFileContent';

export const useAutoSave = (interval: number = 30000) => {
  const { openFiles, activeFileId } = useEditorStore();
  const saveFile = useSaveFile();
  
  const filesRef = useRef(openFiles);

  useEffect(() => {
    filesRef.current = openFiles;
  }, [openFiles]);

  useEffect(() => {
    const timer = setInterval(() => {
      const activeFile = filesRef.current.find((f) => f.id === activeFileId);
      
      if (activeFile) {
        console.log('Auto saving...', activeFile.name);
        saveFile.mutate({
          fileId: Number(activeFile.id),
          content: activeFile.content,
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [interval, activeFileId, saveFile]);
};