import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { LoginCredentials } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: () => {
      navigate('/projects');
    },
  });
};
