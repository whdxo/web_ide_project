import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';
import type {
  CreateFileRequest,
  CreateFolderRequest,
} from '@/shared/features-types/file.types';

export const useFileOperations = (projectId: number) => {
  const queryClient = useQueryClient();

  // 파일 생성
  const createFile = useMutation({
    mutationFn: (data: CreateFileRequest) =>
      fileApi.createFile(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });

  // 폴더 생성
  const createFolder = useMutation({
    mutationFn: (data: CreateFolderRequest) =>
      fileApi.createFolder(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });

  // 파일 삭제
  const deleteFile = useMutation({
    mutationFn: (fileId: number) => fileApi.deleteFile(projectId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });

  // 폴더 삭제
  const deleteFolder = useMutation({
    mutationFn: (folderId: number) => fileApi.deleteFolder(projectId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });

  return {
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
  };
};