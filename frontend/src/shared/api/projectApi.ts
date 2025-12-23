import { apiClient } from './client';
import type { ApiResponse } from '@/shared/types/common.types';
import type { 
  CreateProjectRequest, 
  CreateProjectResponse, 
  GetProjectsResponse,
  GetProjectMembersResponse, 
  AddMemberRequest, 
  AddMemberResponse,
  JoinProjectRequest,
  JoinProjectResponse,
  CreateInviteCodeResponse
} from '@/shared/features-types/project.types';

export const projectApi = {
  getProjects: async (): Promise<GetProjectsResponse> => {
    const response = await apiClient.get<GetProjectsResponse>('/api/projects');
    return response.data;
  },
  createProject: async (data: CreateProjectRequest): Promise<CreateProjectResponse> => {
    const response = await apiClient.post<CreateProjectResponse>('/api/projects', data);
    return response.data;
  },
  joinProject: async (data: JoinProjectRequest): Promise<JoinProjectResponse> => {
    const response = await apiClient.post<JoinProjectResponse>('/api/projects/join', data);
    return response.data;
  },
  createInviteCode: async (projectId: number): Promise<CreateInviteCodeResponse> => {
    const response = await apiClient.post<CreateInviteCodeResponse>(`/api/projects/${projectId}/invite`);
    return response.data;
  },
  getProjectMembers: async (projectId: number): Promise<GetProjectMembersResponse> => {
    const response = await apiClient.get<GetProjectMembersResponse>(`/api/projects/${projectId}/members`);
    return response.data;
  },
  addMember: async (projectId: number, data: AddMemberRequest): Promise<AddMemberResponse> => {
    const response = await apiClient.post<AddMemberResponse>(`/api/projects/${projectId}/members`, data);
    return response.data;
  },
  removeMember: async (projectId: number, memberId: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/projects/${projectId}/members/${memberId}`);
    return response.data;
  },
  deleteProject: async (projectId: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/projects/${projectId}`);
    return response.data;
  }
};

