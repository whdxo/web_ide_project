import type { ApiResponse } from '@/shared/types/common.types';

export interface Project {
  project_id: number;
  name: string;
  description?: string;
  owner_id: number;
  created_at: string;
  project_type: 'PERSONAL' | 'TEAM';
  current_user_role?: 'OWNER' | 'USER';
  can_delete?: boolean;
  can_invite?: boolean;
  can_leave?: boolean;
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


export interface ProjectMember {
  userId: number;
  name: string;
  email: string;
  joinedAt?: string;
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

export interface ProjectJoinResponseData {
  project: Project;
  success: boolean;
}
export type JoinProjectResponse = ApiResponse<ProjectJoinResponseData>;
export type CreateInviteCodeResponse = ApiResponse<InviteCodeResponse>;

export interface InvitationInfo {
  project_id: number;
  projectName: string;
  description?: string;
  inviterName: string;
  expiresAt: string;
  project_type: 'PERSONAL' | 'TEAM';
}
export type InvitationInfoResponse = ApiResponse<InvitationInfo>;
