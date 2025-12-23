import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileApi } from '@/shared/api/fileApi';
import { CreateFileRequest, CreateFolderRequest } from '@/shared/features-types/file.types';

export const useFileOperations = (projectId: number) => {
  const queryClient = useQueryClient();

  const createFile = useMutation({
    mutationFn: (data: CreateFileRequest) => fileApi.createFile(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', projectId] });
    },
  });

  const createFolder = useMutation({
    mutationFn: (data: CreateFolderRequest) => fileApi.createFolder(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', projectId] });
    },
  });

  const deleteFile = useMutation({
    mutationFn: (fileId: number) => fileApi.deleteFile(projectId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', projectId] });
    },
  });

  const deleteFolder = useMutation({
    mutationFn: (folderId: number) => fileApi.deleteFolder(projectId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', projectId] });
    },
  });

  return { createFile, createFolder, deleteFile, deleteFolder };
};
