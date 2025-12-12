import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useJoin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: userApi.join,
    onSuccess: () => {
      navigate('/login');
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: userApi.getMe,
    retry: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: { name: string } }) => 
      userApi.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

export const useDeleteUser = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      logout();
      navigate('/login');
    },
  });
};
