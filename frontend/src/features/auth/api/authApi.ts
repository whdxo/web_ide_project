import { apiClient } from '@/shared/utils/api';
import type { 
  LoginRequest, 
  LoginResponse, 
  LogoutResponse, 
  RefreshResponse, 
  PasswordChangeRequest, 
  PasswordChangeResponse 
} from '../types/auth.types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
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
  }
};
