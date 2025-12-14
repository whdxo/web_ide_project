import { useQuery } from '@tanstack/react-query';
import { editorApi } from '../api/editorApi';

export const useFileContent = (fileId: string) => {
  return useQuery({
    queryKey: ['file', fileId],
    queryFn: () => editorApi.getFileContent(fileId),
    enabled: !!fileId,
  });
};
