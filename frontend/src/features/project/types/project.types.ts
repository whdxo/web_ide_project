import type { ApiResponse } from '@/shared/types/common.types';

export interface Project {
  project_id: number;
  name: string;
  owner_id: number;
  description: string;
  created_at: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  owner_id: number;
  startDate: string;
  endDate: string;
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
export type GetProjectMembersResponse = ApiResponse<ProjectMember[]>;
export type AddMemberResponse = ApiResponse<ProjectMember>;
