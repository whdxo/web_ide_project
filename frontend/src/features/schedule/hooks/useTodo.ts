import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '@/shared/api/scheduleApi';
import type { TodoResponse, TodoCreateRequest, TodoUpdateRequest } from '@/shared/api/scheduleApi';

// Todo 목록 조회
export const useTodos = (params?: {
  completed?: boolean;
  dueDate?: string;
  projectId?: number;
}) => {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: () => scheduleApi.getTodos(params),
    staleTime: 30000,
  });
};

// Todo 생성
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoCreateRequest) => scheduleApi.createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Todo 수정
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todoId,
      data,
    }: {
      todoId: number;
      data: TodoUpdateRequest;
    }) => scheduleApi.updateTodo(todoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Todo 완료 토글
export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => scheduleApi.toggleTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Todo 삭제
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => scheduleApi.deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// 타입 export
export type { TodoResponse };