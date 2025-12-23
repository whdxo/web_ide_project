import { useQuery } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';

export const useFileContent = (fileId: number) => {
  return useQuery({
    queryKey: ['file', fileId],
    queryFn: () => fileApi.getFileContent(fileId),
    enabled: !!fileId,
  });
};
