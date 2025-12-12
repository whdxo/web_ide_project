import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scheduleApi } from '../api/scheduleApi';
import type { 
  CreateSprintRequest, 
  CreateTodoRequest, 
  CreateTaskRequest, 
  UpdateTaskStatusRequest, 
  UpdateTaskAssigneeRequest 
} from '../types/schedule.types';

// Sprints
export const useSprints = (projectId: number) => {
  return useQuery({
    queryKey: ['sprints', projectId],
    queryFn: () => scheduleApi.getSprints(projectId),
    enabled: !!projectId,
  });
};

export const useCreateSprint = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSprintRequest) => scheduleApi.createSprint(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sprints', projectId] });
    },
  });
};

// Todos
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: scheduleApi.getTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scheduleApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ todoId, data }: { todoId: number; data: Partial<CreateTodoRequest> }) => 
      scheduleApi.updateTodo(todoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scheduleApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Tasks
export const useTasks = (projectId: number) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => scheduleApi.getTasks(projectId),
    enabled: !!projectId,
  });
};

export const useCreateTask = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskRequest) => scheduleApi.createTask(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });
};

export const useUpdateTaskStatus = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: number; data: UpdateTaskStatusRequest }) => 
      scheduleApi.updateTaskStatus(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });
};

export const useUpdateTaskAssignee = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: number; data: UpdateTaskAssigneeRequest }) => 
      scheduleApi.updateTaskAssignee(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });
};
