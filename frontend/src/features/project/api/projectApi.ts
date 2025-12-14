import { apiClient } from '@/shared/utils/api';
import type { ApiResponse } from '@/shared/types/common.types';
import type { 
  CreateProjectRequest, 
  CreateProjectResponse, 
  GetProjectMembersResponse, 
  AddMemberRequest, 
  AddMemberResponse 
} from '../types/project.types';

export const projectApi = {
  createProject: async (data: CreateProjectRequest): Promise<CreateProjectResponse> => {
    const response = await apiClient.post<CreateProjectResponse>('/api/projects', data);
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
  }
};
