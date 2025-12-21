import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/api/authApi';
import { LoginRequest } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (response) => {
      // 토큰 저장
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      navigate('/projects');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  });
};
