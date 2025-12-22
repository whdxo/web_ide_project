import type { ApiResponse } from '@/shared/types/common.types';

export type NodeType = 'FILE' | 'FOLDER';

// 파일/폴더 트리 노드
export interface TreeNode {
  id: number;
  name: string;
  type: NodeType;
  children?: TreeNode[];
}

// 프로젝트 트리 응답
export interface ProjectTree {
  projectId: number;
  name: string;
  rootFolders: TreeNode[];
}

// 파일 상세 정보
export interface FileDetail {
  file_id: number;
  project_id: number;
  parent_folder_id: number | null;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// 폴더 생성 요청
export interface CreateFolderRequest {
  name: string;
  parent_folder_id: number | null;
}

// 파일 생성 요청
export interface CreateFileRequest {
  name: string;
  content: string;
  parent_folder_id: number | null;
}

// 파일 내용 저장 요청
export interface SaveFileRequest {
  content: string;
}

// 파일 내용 저장 응답 데이터
export interface SaveFileResponseData {
  file_id: number;
  updated_at: string;
}

// API 응답 타입들
export type GetProjectTreeResponse = ApiResponse<ProjectTree>;
export type CreateFolderResponse = ApiResponse<FileDetail>;
export type CreateFileResponse = ApiResponse<FileDetail>;
export type GetFileContentResponse = ApiResponse<FileDetail>;
export type SaveFileResponse = ApiResponse<SaveFileResponseData>;
export type DeleteFileResponse = ApiResponse<null>;
export type DeleteFolderResponse = ApiResponse<null>;