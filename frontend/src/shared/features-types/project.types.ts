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
  code: string;
  invitationUrl: string;
  expiresAt: string;
}

export interface InvitationInfoResponse {
  projectName: string;
  inviterName: string;
  expiresAt: string;
}

export interface ProjectMember {
  memberId: number;
  projectId: number;
  userId: number;
  role: 'OWNER' | 'EDITOR' | 'USER';
  name?: string;
  email?: string;
  joinedAt?: string;
}

export interface AddMemberRequest {
  user_id: number;
  role: 'USER' | 'EDITOR';
}

export type CreateProjectResponse = ApiResponse<Project>;
export type GetProjectsResponse = ApiResponse<Project[]>;

export interface ProjectJoinResponse {
  project: Project;
  success: boolean;
}

export type GetProjectMembersResponse = ApiResponse<ProjectMember[]>;
export type AddMemberResponse = ApiResponse<ProjectMember>;
export type JoinProjectResponse = ApiResponse<ProjectJoinResponse>;
export type CreateInviteCodeResponse = ApiResponse<InviteCodeResponse>;
export type GetInvitationInfoResponse = ApiResponse<InvitationInfoResponse>;
