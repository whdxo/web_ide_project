import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/shared/api/projectApi';
import type { CreateProjectRequest } from '../types/project.types';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectApi.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
