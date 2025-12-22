import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/shared/api/projectApi';
import type { JoinProjectRequest } from '../../../shared/features-types/project.types';

export const useProjectInvite = () => {
  const queryClient = useQueryClient();

  const joinProject = useMutation({
    mutationFn: (data: JoinProjectRequest) => projectApi.joinProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const createInviteCode = useMutation({
    mutationFn: (projectId: number) => projectApi.createInviteCode(projectId),
  });

  return {
    joinProject,
    createInviteCode,
  };
};
