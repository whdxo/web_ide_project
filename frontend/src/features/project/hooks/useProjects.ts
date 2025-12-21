import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/shared/api/projectApi';

export const useProjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectApi.getProjects,
  });

  return {
    projects: data?.data || [],
    isLoading,
    error,
  };
};

