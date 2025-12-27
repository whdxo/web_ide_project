import type { ApiResponse } from '@/shared/types/common.types';

export type NodeType = 'FILE' | 'FOLDER';

// 파일/폴더 트리 노드
export interface FileNode {
  id: number;
  parentId: number | null;
  name: string;
  type: string; // 'FILE' or 'FOLDER'
  language?: string | null; // only for files
  children: FileNode[];
}

// 프로젝트 트리 응답
export interface ProjectTree {
  projectId: number;
  nodes: FileNode[];
}

// 파일 상세 정보 (백엔드 FileResponse와 일치)
export interface FileDetail {
  id: number;
  folderId: number | null;
  name: string;
  language: string;
  content: string;
}

// 폴더 생성 요청
export interface CreateFolderRequest {
  name: string;
  parentId: number | null;
}

// 파일 생성 요청
export interface CreateFileRequest {
  name: string;
  folderId: number | null;
  language: string;
  content?: string;
}

// 파일 내용 저장 요청
export interface SaveFileRequest {
  content: string;
}

// 파일 내용 저장 응답 데이터
export interface SaveFileResponseData {
  id: number;
  folderId: number | null;
  name: string;
  language: string;
  content: string;
}

// API 응답 타입들
export type GetProjectTreeResponse = ProjectTree; // Backend returns TreeResponse directly without ApiResponse wrapper
export type CreateFolderResponse = ApiResponse<FileDetail>;
export type CreateFileResponse = ApiResponse<FileDetail>;
export type GetFileContentResponse = ApiResponse<FileDetail>;
export type SaveFileResponse = ApiResponse<SaveFileResponseData>;
export type DeleteFileResponse = ApiResponse<null>;
export type DeleteFolderResponse = ApiResponse<null>;