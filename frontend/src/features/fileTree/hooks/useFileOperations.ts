import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';

export const useFileOperations = () => {
  const queryClient = useQueryClient();

  const createFile = useMutation({
    mutationFn: fileApi.createFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });

  return { createFile };
};
