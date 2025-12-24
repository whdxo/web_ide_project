import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';

// 파일 내용 조회
export const useFileContent = (fileId: number | null) => {
  return useQuery({
    queryKey: ['fileContent', fileId],
    queryFn: async () => {
      if (!fileId) throw new Error('File ID is required');
      const response = await fileApi.getFileContent(fileId);
      return response;
    },
    enabled: !!fileId,
    staleTime: 10000,
  });
};

// 파일 저장
export const useSaveFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileId, content }: { fileId: number; content: string }) =>
      fileApi.saveFileContent(fileId, { content }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['fileContent', variables.fileId],
      });
    },
  });
};