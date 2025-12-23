import { useQuery } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';

export const useFileTree = (projectId: number) => {
  return useQuery({
    queryKey: ['files', projectId],
    queryFn: () => fileApi.getProjectTree(projectId),
    enabled: !!projectId,
  });
};
