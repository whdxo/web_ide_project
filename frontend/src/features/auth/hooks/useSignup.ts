import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { SignupCredentials } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: SignupCredentials) => authApi.signup(credentials),
    onSuccess: () => {
      navigate('/login');
    },
  });
};
