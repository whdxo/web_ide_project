import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authApi } from '@/shared/api/authApi';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    if (error) {
      alert(message || '소셜 로그인에 실패했습니다.');
      navigate('/login');
      return;
    }

    if (token) {
      const handleLogin = async () => {
        try {
          // 토큰 임시 저장 (API 호출을 위해)
          localStorage.setItem('token', token);
          
          // 사용자 정보 조회
          const response = await authApi.me();
          
          if (response.data) {
            // 스토어 업데이트 (RefreshToken은 현재 URL로 안넘어오므로 AccessToken과 동일하게 처리하거나 비워둠)
            // 명세서상 RefreshToken 전달 방식이 명확하지 않아 일단 AccessToken만 저장
            // 필요시 백엔드에서 refreshToken도 쿼리 파라미터로 넘겨줘야 함
            setAuth(response.data, token, token); 
            navigate('/projects');
          } else {
            throw new Error('User data not found');
          }
        } catch (err) {
          console.error('OAuth login failed:', err);
          alert('로그인 처리 중 오류가 발생했습니다.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      };

      handleLogin();
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="text-white text-xl">로그인 처리 중...</div>
    </div>
  );
};
