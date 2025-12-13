// TODO: 박영선 - 인증 상태 관리 (Zustand)
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
}));
