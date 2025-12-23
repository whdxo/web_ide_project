import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/shared/api/projectApi';

export const useProjects = () => {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectApi.getProjects,
  });

  const deleteProjectMutation = useMutation({
    mutationFn: projectApi.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: data?.data || [],
    isLoading,
    error,
    deleteProject: deleteProjectMutation.mutate,
  };
};

