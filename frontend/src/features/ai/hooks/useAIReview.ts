import { useEffect, useCallback } from 'react';
import { useEditorStore } from '@/features/editor/store/editorStore';
import { useAIStore } from '../store/aiStore';

export const useAIReview = () => {
  const { openFiles, activeFileId } = useEditorStore();
  const {
    currentReview,
    reviewHistory,
    loading,
    error,
    activeTab,
    requestReview,
    fetchHistory,
    fetchDetail,
    setActiveTab,
    reset,
  } = useAIStore();

  // 현재 활성 파일
  const activeFile = openFiles.find((file) => file.id === activeFileId);

  // 파일 변경 시 이력 자동 로드 및 초기화
  useEffect(() => {
    if (activeFile?.path) {
      reset();
      fetchHistory(activeFile.path);
    }
  }, [activeFile?.id, reset, fetchHistory]);

  // 리뷰 요청 핸들러 (파일 정보 자동 주입)
  const handleRequestReview = useCallback(async () => {
    if (!activeFile || !activeFile.path) return;

    await requestReview({
      fileName: activeFile.name,
      filePath: activeFile.path,
      fileContent: activeFile.content,
    });
  }, [activeFile, requestReview]);

  return {
    activeFile,
    currentReview,
    reviewHistory,
    loading,
    error,
    activeTab,
    handleRequestReview,
    fetchDetail,
    setActiveTab,
  };
};
