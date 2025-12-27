import { useQuery } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';

export const useFileTree = (projectId: number | null) => {
  return useQuery({
    queryKey: ['projectTree', projectId],
    queryFn: async () => {
      if (!projectId) throw new Error('Project ID is required');
      const response = await fileApi.getProjectTree(projectId);
      return response; // getProjectTree already returns response.data, don't access .data again
    },
    enabled: !!projectId,
    staleTime: 30000,
  });
};