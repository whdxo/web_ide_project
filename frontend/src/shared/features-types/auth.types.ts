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
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshResponseData {
  accessToken: string;
  refreshToken: string;
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

export interface ForgotPasswordRequest {
  email: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
export type RefreshResponse = ApiResponse<RefreshResponseData>;
export type LogoutResponse = ApiResponse<null>;
export type PasswordChangeResponse = ApiResponse<null>;
export type JoinResponse = ApiResponse<User>;
export type UserResponse = ApiResponse<User>;
export type UpdateUserResponse = ApiResponse<User>;
export type DeleteUserResponse = ApiResponse<null>;
