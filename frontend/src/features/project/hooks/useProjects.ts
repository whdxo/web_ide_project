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

// 프로젝트 삭제 (SettingPanel용)
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => projectApi.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};