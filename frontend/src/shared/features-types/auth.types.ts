import type { ApiResponse } from '@/shared/types/common.types';

export interface User {
  userId: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  user: User;
}

export interface RefreshResponseData {
  token: string;
  expiresIn: number;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}

export interface JoinRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
export type RefreshResponse = ApiResponse<RefreshResponseData>;
export type LogoutResponse = ApiResponse<null>;
export type PasswordChangeResponse = ApiResponse<null>;
export type JoinResponse = ApiResponse<User>;
export type UserResponse = ApiResponse<User>;
