import { apiClient } from './client';
import type { ApiResponse } from '@/shared/types/common.types';
import type { 
  LoginRequest, 
  LoginResponse, 
  LogoutResponse, 
  RefreshResponse, 
  PasswordChangeRequest, 
  PasswordChangeResponse,
  JoinRequest,
  JoinResponse,
  UserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserResponse,
  ForgotPasswordRequest
} from '@/shared/features-types/auth.types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
    return response.data;
  },
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>('/api/auth/reset-password-request', data);
    return response.data;
  },
  logout: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>('/api/auth/logout');
    return response.data;
  },
  refresh: async (): Promise<RefreshResponse> => {
    const response = await apiClient.post<RefreshResponse>('/api/auth/refresh');
    return response.data;
  },
  changePassword: async (data: PasswordChangeRequest): Promise<PasswordChangeResponse> => {
    const response = await apiClient.put<PasswordChangeResponse>('/api/auth/password', data);
    return response.data;
  },
  signup: async (data: JoinRequest): Promise<JoinResponse> => {
    const response = await apiClient.post<JoinResponse>('/api/users/join', data);
    return response.data;
  },
  me: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/api/users/me');
    return response.data;
  },
  updateUser: async (userId: number, data: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const response = await apiClient.put<UpdateUserResponse>(`/api/users/${userId}`, data);
    return response.data;
  },
  deleteUser: async (userId: number): Promise<DeleteUserResponse> => {
    const response = await apiClient.delete<DeleteUserResponse>(`/api/users/${userId}`);
    return response.data;
  }
};
