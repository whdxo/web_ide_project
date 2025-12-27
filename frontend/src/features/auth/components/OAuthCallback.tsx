import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authApi } from '@/shared/api/authApi';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    if (error) {
      alert(message || '소셜 로그인에 실패했습니다.');
      navigate('/login');
      return;
    }

    if (accessToken && refreshToken) {
      const handleLogin = async () => {
        try {
          // 토큰 임시 저장 (API 호출을 위해)
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // 사용자 정보 조회
          const response = await authApi.me();

          if (response.data) {
            setAuth(response.data, accessToken, refreshToken);
            navigate('/projects');
          } else {
            throw new Error('User data not found');
          }
        } catch (err) {
          console.error('OAuth login failed:', err);
          alert('로그인 처리 중 오류가 발생했습니다.');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          navigate('/login');
        }
      };

      handleLogin();
    } else {
      console.error('Tokens not found in URL');
      navigate('/login');
    }
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="text-white text-xl">로그인 처리 중...</div>
    </div>
  );
};
