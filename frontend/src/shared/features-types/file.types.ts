import { ApiResponse } from "@/shared/types/common.types";

export type FileType = "FILE" | "FOLDER";

export interface FileNode {
  id: number;
  name: string;
  type: FileType;
  children?: FileNode[];
}

export interface ProjectTreeData {
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

export interface FileData {
  file_id: number;
  project_id: number;
  parent_folder_id: number | null;
  name: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateFileContentRequest {
  content: string;
}

export interface UpdateFileContentResponseData {
  file_id: number;
  updated_at: string;
}

export type GetProjectTreeResponse = ApiResponse<ProjectTreeData>;
export type CreateFolderResponse = ApiResponse<FileData>;
export type CreateFileResponse = ApiResponse<FileData>;
export type GetFileContentResponse = ApiResponse<FileData>;
export type UpdateFileContentResponse = ApiResponse<UpdateFileContentResponseData>;

