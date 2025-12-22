import type { ApiResponse } from '@/shared/types/common.types';

export interface Project {
  id: number;
  name: string;
  description?: string;
  language: string;
  type: 'PERSONAL' | 'TEAM';
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  language: string;
  type: 'PERSONAL' | 'TEAM';
}

export interface JoinProjectRequest {
  inviteCode: string;
}

export interface InviteCodeResponse {
  inviteCode: string;
  expiresAt: string;
}

export interface ProjectMember {
  member_id: number;
  project_id: number;
  user_id: number;
  role: 'OWNER' | 'EDITOR' | 'USER';
}

export interface AddMemberRequest {
  user_id: number;
  role: 'USER' | 'EDITOR';
}

export type CreateProjectResponse = ApiResponse<Project>;
export type GetProjectsResponse = ApiResponse<Project[]>;
export type GetProjectMembersResponse = ApiResponse<ProjectMember[]>;
export type AddMemberResponse = ApiResponse<ProjectMember>;
export type JoinProjectResponse = ApiResponse<void>;
export type CreateInviteCodeResponse = ApiResponse<InviteCodeResponse>;

