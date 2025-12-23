import { apiClient } from './client';
import type { ApiResponse } from '@/shared/types/common.types';
import type {
  GetProjectTreeResponse,
  CreateFolderRequest,
  CreateFolderResponse,
  CreateFileRequest,
  CreateFileResponse,
  GetFileContentResponse,
  SaveFileRequest,
  SaveFileResponse,
  DeleteFileResponse,
  DeleteFolderResponse
} from '@/shared/features-types/file.types';

export const fileApi = {
  // 프로젝트 트리 조회
  getProjectTree: async (projectId: number): Promise<GetProjectTreeResponse> => {
    const response = await apiClient.get<GetProjectTreeResponse>(
      `/api/projects/${projectId}/tree`
    );
    return response.data;
  },

  // 폴더 생성
  createFolder: async (
    projectId: number,
    data: CreateFolderRequest
  ): Promise<CreateFolderResponse> => {
    const response = await apiClient.post<CreateFolderResponse>(
      `/api/projects/${projectId}/folders`,
      data
    );
    return response.data;
  },

  // 폴더 삭제
  deleteFolder: async (
    projectId: number,
    folderId: number
  ): Promise<DeleteFolderResponse> => {
    const response = await apiClient.delete<DeleteFolderResponse>(
      `/api/projects/${projectId}/folders/${folderId}`
    );
    return response.data;
  },

  // 파일 생성
  createFile: async (
    projectId: number,
    data: CreateFileRequest
  ): Promise<CreateFileResponse> => {
    const response = await apiClient.post<CreateFileResponse>(
      `/api/projects/${projectId}/files`,
      data
    );
    return response.data;
  },

  // 파일 삭제
  deleteFile: async (
    projectId: number,
    fileId: number
  ): Promise<DeleteFileResponse> => {
    const response = await apiClient.delete<DeleteFileResponse>(
      `/api/projects/${projectId}/files/${fileId}`
    );
    return response.data;
  },

  // 파일 내용 조회
  getFileContent: async (fileId: number): Promise<GetFileContentResponse> => {
    const response = await apiClient.get<GetFileContentResponse>(
      `/api/files/${fileId}`
    );
    return response.data;
  },

  // 파일 내용 저장
  saveFileContent: async (
    fileId: number,
    data: SaveFileRequest
  ): Promise<SaveFileResponse> => {
    const response = await apiClient.put<SaveFileResponse>(
      `/api/files/${fileId}`,
      data
    );
    return response.data;
  },
};