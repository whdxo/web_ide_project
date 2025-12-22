import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/api/authApi';
import { JoinRequest } from '../../../shared/features-types/auth.types';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: JoinRequest) => authApi.signup(credentials),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    },
    onError: (error) => {
      console.error('Signup failed:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  });
};
