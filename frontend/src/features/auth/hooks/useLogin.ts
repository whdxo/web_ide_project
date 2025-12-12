import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { LoginRequest } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: () => {
      navigate('/projects');
    },
  });
};
