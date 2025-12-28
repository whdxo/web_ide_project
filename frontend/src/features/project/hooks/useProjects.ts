import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/shared/api/projectApi';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (projectId: number) => projectApi.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alert("프로젝트가 삭제되었습니다");
      navigate("/projects");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "프로젝트 삭제에 실패했습니다";
      alert(message);
    }
  });
};

// 프로젝트 나가기 (ProjectList용)
export const useLeaveProjectFromList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => projectApi.leaveProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alert("프로젝트에서 나갔습니다");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "프로젝트 나가기에 실패했습니다";
      alert(message);
    }
  });
};

// 프로젝트 나가기 (SettingPanel용 - 에디터에서)
export const useLeaveProjectFromEditor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (projectId: number) => projectApi.leaveProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alert("프로젝트에서 나갔습니다");
      navigate("/projects");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "프로젝트 나가기에 실패했습니다";
      alert(message);
    }
  });
};