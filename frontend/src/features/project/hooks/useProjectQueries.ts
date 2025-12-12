import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '../api/projectApi';
import { useNavigate } from 'react-router-dom';

export const useCreateProject = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: projectApi.createProject,
    onSuccess: (response) => {
      if (response.success) {
        navigate(`/projects/${response.data.project_id}`);
      }
    },
  });
};

export const useProjectMembers = (projectId: number) => {
  return useQuery({
    queryKey: ['projectMembers', projectId],
    queryFn: () => projectApi.getProjectMembers(projectId),
    enabled: !!projectId,
  });
};

export const useAddMember = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { user_id: number; role: 'USER' | 'EDITOR' }) => 
      projectApi.addMember(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectMembers', projectId] });
    },
  });
};

export const useRemoveMember = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: number) => projectApi.removeMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectMembers', projectId] });
    },
  });
};
