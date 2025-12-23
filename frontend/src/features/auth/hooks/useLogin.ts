import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/api/authApi';
import { LoginRequest } from '@/shared/features-types/auth.types';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (response) => {
      // 토큰 및 유저 정보 저장
      if (response.data?.accessToken && response.data?.user) {
        setAuth(response.data.user, response.data.accessToken, response.data.refreshToken);
      }
      navigate('/projects');
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
      const message = error.response?.data?.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
      alert(`오류: ${message}`);
    }
  });
};
