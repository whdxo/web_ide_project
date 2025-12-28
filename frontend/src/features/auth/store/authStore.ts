import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/shared/features-types/auth.types';

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
      setAuth: (user, token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        set({ user, token, refreshToken, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => (state) => {
        console.log('[Auth Store] Rehydration complete. State:', {
          hasUser: !!state?.user,
          hasToken: !!state?.token,
          isAuthenticated: state?.isAuthenticated
        });

        // persist 복원 후 localStorage도 동기화 (client.ts 호환성 위해)
        if (state?.token) {
          localStorage.setItem('token', state.token);
          if (state.refreshToken) {
            localStorage.setItem('refreshToken', state.refreshToken);
          }
          console.log('[Auth Store] localStorage synced with persisted state');
        }
        // 토큰이 없을 때는 localStorage를 건드리지 않음 (로그인 방해 방지)

        state?.setHasHydrated(true);
      },
    }
  )
);

// 다른 탭에서 localStorage 변경 감지 (다중 탭 로그아웃 동기화)
// 로그인은 각 탭에서 독립적으로 수행, 로그아웃만 동기화
if (typeof window !== 'undefined') {
  console.log('[Auth Store] Storage event listener registered at', new Date().toLocaleTimeString());

  window.addEventListener('storage', (e) => {
    console.log('[Storage Event] Key:', e.key, 'NewValue:', e.newValue?.substring(0, 50));

    // 로그아웃만 감지 (토큰 삭제 시)
    if (e.key === 'token' && e.newValue === null) {
      console.log('[Auth Sync] Token removed - logging out');
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
  });
}
