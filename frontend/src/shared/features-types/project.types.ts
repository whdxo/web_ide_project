import type { ApiResponse } from '@/shared/types/common.types';

export interface Project {
  project_id: number;
  name: string;
  description?: string;
  owner_id: number;
  created_at: string;
  project_type: 'PERSONAL' | 'TEAM';
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  owner_id: number;
  project_type: 'PERSONAL' | 'TEAM';
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

