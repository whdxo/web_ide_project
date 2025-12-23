import { apiClient } from './client';
import type { ApiResponse } from '@/shared/types/common.types';
import type {
  GetProjectTreeResponse,
  CreateFolderRequest,
  CreateFolderResponse,
  CreateFileRequest,
  CreateFileResponse,
  GetFileContentResponse,
  UpdateFileContentRequest,
  UpdateFileContentResponse
} from '@/shared/features-types/file.types';

export const fileApi = {
  getProjectTree: async (projectId: number): Promise<GetProjectTreeResponse> => {
    const response = await apiClient.get<GetProjectTreeResponse>(`/api/projects/${projectId}/tree`);
    return response.data;
  },
  createFolder: async (projectId: number, data: CreateFolderRequest): Promise<CreateFolderResponse> => {
    const response = await apiClient.post<CreateFolderResponse>(`/api/projects/${projectId}/folders`, data);
    return response.data;
  },
  deleteFolder: async (projectId: number, folderId: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/projects/${projectId}/folders/${folderId}`);
    return response.data;
  },
  createFile: async (projectId: number, data: CreateFileRequest): Promise<CreateFileResponse> => {
    const response = await apiClient.post<CreateFileResponse>(`/api/projects/${projectId}/files`, data);
    return response.data;
  },
  deleteFile: async (projectId: number, fileId: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/projects/${projectId}/files/${fileId}`);
    return response.data;
  },
  getFileContent: async (fileId: number): Promise<GetFileContentResponse> => {
    const response = await apiClient.get<GetFileContentResponse>(`/api/files/${fileId}`);
    return response.data;
  },
  saveFileContent: async (fileId: number, data: UpdateFileContentRequest): Promise<UpdateFileContentResponse> => {
    const response = await apiClient.put<UpdateFileContentResponse>(`/api/files/${fileId}`, data);
    return response.data;
  }
};
