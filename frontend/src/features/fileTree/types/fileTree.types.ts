import type { ApiResponse } from '@/shared/types/common.types';

export interface FileNode {
  id: number;
  name: string;
  type: 'FILE' | 'FOLDER';
  children?: FileNode[];
}

export interface ProjectTree {
  projectId: number;
  name: string;
  rootFolders: FileNode[];
}

export interface CreateFolderRequest {
  name: string;
  parent_folder_id: number | null;
}

export interface CreateFileRequest {
  name: string;
  content: string;
  parent_folder_id: number | null;
}

export interface FileContent {
  file_id: number;
  project_id: number;
  parent_folder_id: number | null;
  name: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateFileRequest {
  content: string;
}

export type GetProjectTreeResponse = ApiResponse<ProjectTree>;
export type CreateFolderResponse = ApiResponse<FileContent>;
export type CreateFileResponse = ApiResponse<FileContent>;
export type GetFileContentResponse = ApiResponse<FileContent>;
export type UpdateFileResponse = ApiResponse<{ file_id: number; updated_at: string }>;
