import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 인증이 필요한 페이지를 보호하는 컴포넌트
 * 토큰이 없거나 인증되지 않은 경우 로그인 페이지로 리다이렉트
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  console.log('[ProtectedRoute] hasHydrated:', hasHydrated, 'isAuthenticated:', isAuthenticated, 'hasToken:', !!token);

  // Zustand persist가 localStorage에서 데이터를 복원할 때까지 대기
  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black">
        <div className="text-white">로딩 중...</div>
      </div>
    );
  }

  // 토큰이 없거나 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated || !token) {
    console.log('[ProtectedRoute] Redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  console.log('[ProtectedRoute] Allowing access');
  return <>{children}</>;
};
