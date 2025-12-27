import { useMutation } from '@tanstack/react-query';
import { editorApi } from '@/shared/api/editorApi';

export const useExecuteCode = () => {
  return useMutation({
    mutationFn: ({ code, language }: { code: string; language: string }) =>
      editorApi.executeCode({ code, language }),
  });
};