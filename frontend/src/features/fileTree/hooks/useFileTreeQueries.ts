import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fileTreeApi } from '../api/fileTreeApi';
import type { CreateFileRequest, CreateFolderRequest, UpdateFileRequest } from '../types/fileTree.types';

export const useProjectTree = (projectId: number) => {
  return useQuery({
    queryKey: ['projectTree', projectId],
    queryFn: () => fileTreeApi.getProjectTree(projectId),
    enabled: !!projectId,
  });
};

export const useCreateFolder = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFolderRequest) => fileTreeApi.createFolder(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });
};

export const useDeleteFolder = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: number) => fileTreeApi.deleteFolder(projectId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });
};

export const useCreateFile = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFileRequest) => fileTreeApi.createFile(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });
};

export const useDeleteFile = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fileId: number) => fileTreeApi.deleteFile(projectId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTree', projectId] });
    },
  });
};

export const useFileContent = (fileId: number) => {
  return useQuery({
    queryKey: ['fileContent', fileId],
    queryFn: () => fileTreeApi.getFileContent(fileId),
    enabled: !!fileId,
  });
};

export const useUpdateFileContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fileId, data }: { fileId: number; data: UpdateFileRequest }) => 
      fileTreeApi.updateFileContent(fileId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['fileContent', variables.fileId] });
    },
  });
};
