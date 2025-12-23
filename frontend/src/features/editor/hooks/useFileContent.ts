import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorApi } from '@/shared/api/editorApi';

// 파일 내용 조회
export const useFileContent = (fileId: number | null) => {
  return useQuery({
    queryKey: ['fileContent', fileId],
    queryFn: async () => {
      if (!fileId) throw new Error('File ID is required');
      const response = await editorApi.loadFile(fileId);
      return response.data;
    },
    enabled: !!fileId,
    staleTime: 10000, // 10초간 캐시
  });
};

// 파일 저장
export const useSaveFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileId, content }: { fileId: number; content: string }) =>
      editorApi.saveFile(fileId, content),
    onSuccess: (_, variables) => {
      // 저장 후 해당 파일 캐시 갱신
      queryClient.invalidateQueries({
        queryKey: ['fileContent', variables.fileId],
      });
    },
  });
};