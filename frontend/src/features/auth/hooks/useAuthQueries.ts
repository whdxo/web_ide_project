import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.success) {
        setAuth(response.data.user, response.data.token);
        navigate('/projects');
      }
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      navigate('/login');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  });
};
