import { apiClient } from './client';
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
  DeleteFolderResponse,
  UploadUrlResponse,
  DownloadUrlResponse
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

  // 파일 내용 조회 (S3 방식)
  getFileContent: async (fileId: number): Promise<GetFileContentResponse> => {
    // 1단계: 파일 메타데이터 조회 (이름, 언어 등)
    const metaResponse = await apiClient.get<GetFileContentResponse>(
      `/api/files/${fileId}`
    );

    // 2단계: S3 다운로드 URL 발급
    const urlResponse = await apiClient.get<DownloadUrlResponse>(
      `/api/files/${fileId}/content-url`
    );

    // 3단계: S3에서 직접 다운로드
    try {
      const contentResponse = await fetch(urlResponse.data.downloadUrl);
      if (!contentResponse.ok) {
        throw new Error('S3에서 파일 다운로드 실패');
      }
      const content = await contentResponse.text();

      // 메타데이터 + S3 내용 합쳐서 반환
      return {
        ...metaResponse.data,
        content: content,
      };
    } catch (error) {
      console.error('S3 다운로드 에러:', error);
      // S3 다운로드 실패 시 빈 내용으로 반환
      return {
        ...metaResponse.data,
        content: '',
      };
    }
  },

  // 파일 내용 저장 (S3 방식)
  saveFileContent: async (
    fileId: number,
    data: SaveFileRequest
  ): Promise<SaveFileResponse> => {
    // 1단계: S3 업로드 URL 발급
    const urlResponse = await apiClient.post<UploadUrlResponse>(
      `/api/files/${fileId}/upload-url`
    );

    // 2단계: S3에 직접 업로드
    const uploadResponse = await fetch(urlResponse.data.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: data.content,
    });

    if (!uploadResponse.ok) {
      throw new Error('S3 업로드 실패');
    }

    // 3단계: 업데이트된 파일 메타데이터 조회
    const response = await apiClient.get<SaveFileResponse>(
      `/api/files/${fileId}`
    );

    return response.data;
  },
};