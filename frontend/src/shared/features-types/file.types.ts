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

// 폴더 상세 정보 (백엔드 FolderResponse와 일치)
export interface FolderDetail {
  id: number;
  projectId: number;
  name: string;
  parentId: number | null;
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
export type CreateFolderResponse = FolderDetail; // Backend returns FolderResponse directly without ApiResponse wrapper
export type CreateFileResponse = FileDetail; // Backend returns FileResponse directly without ApiResponse wrapper
export type GetFileContentResponse = FileDetail; // Backend returns FileResponse directly without ApiResponse wrapper
export type SaveFileResponse = FileDetail; // Backend returns FileResponse directly without ApiResponse wrapper
export type DeleteFileResponse = ApiResponse<null>;
export type DeleteFolderResponse = ApiResponse<null>;