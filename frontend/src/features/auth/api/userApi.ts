import { apiClient } from '@/shared/utils/api';
import type { 
  JoinRequest, 
  JoinResponse, 
  UserResponse, 
  UpdateUserRequest 
} from '../types/auth.types';

export const userApi = {
  join: async (data: JoinRequest): Promise<JoinResponse> => {
    const response = await apiClient.post<JoinResponse>('/api/users/join', data);
    return response.data;
  },
  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/api/users/me');
    return response.data;
  },
  updateUser: async (userId: number, data: UpdateUserRequest): Promise<UserResponse> => {
    const response = await apiClient.put<UserResponse>(`/api/users/${userId}`, data);
    return response.data;
  },
  deleteUser: async (): Promise<UserResponse> => {
    const response = await apiClient.delete<UserResponse>('/api/users/me');
    return response.data;
  }
};
