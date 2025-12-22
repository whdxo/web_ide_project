import { create } from 'zustand';
import { AuthState } from '../../../shared/features-types/auth.types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const useAuth = () => {
  const store = useAuthStore();
  return store;
};
