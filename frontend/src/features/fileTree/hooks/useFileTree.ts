import { useQuery } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';

export const useFileTree = (projectId: string) => {
  return useQuery({
    queryKey: ['files', projectId],
    queryFn: () => fileApi.getFiles(projectId),
    enabled: !!projectId,
  });
};
