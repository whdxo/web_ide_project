import { apiClient } from './client';
import type { ApiResponse } from '@/shared/types/common.types';
import type { 
  GetSprintsResponse, 
  CreateSprintRequest, 
  CreateSprintResponse, 
  GetTodosResponse, 
  CreateTodoRequest, 
  CreateTodoResponse, 
  GetTasksResponse, 
  CreateTaskRequest, 
  CreateTaskResponse, 
  UpdateTaskStatusRequest, 
  UpdateTaskAssigneeRequest 
} from '@/features/schedule/types/schedule.types';

export const scheduleApi = {
  // Sprints
  getSprints: async (projectId: number): Promise<GetSprintsResponse> => {
    const response = await apiClient.get<GetSprintsResponse>(`/api/projects/${projectId}/sprints`);
    return response.data;
  },
  createSprint: async (projectId: number, data: CreateSprintRequest): Promise<CreateSprintResponse> => {
    const response = await apiClient.post<CreateSprintResponse>(`/api/projects/${projectId}/sprints`, data);
    return response.data;
  },

  // Personal TODOs
  getTodos: async (): Promise<GetTodosResponse> => {
    const response = await apiClient.get<GetTodosResponse>('/api/todos');
    return response.data;
  },
  createTodo: async (data: CreateTodoRequest): Promise<CreateTodoResponse> => {
    const response = await apiClient.post<CreateTodoResponse>('/api/todos', data);
    return response.data;
  },
  updateTodo: async (todoId: number, data: Partial<CreateTodoRequest>): Promise<CreateTodoResponse> => {
    const response = await apiClient.put<CreateTodoResponse>(`/api/todos/${todoId}`, data);
    return response.data;
  },
  deleteTodo: async (todoId: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/todos/${todoId}`);
    return response.data;
  },

  // Team Tasks
  getTasks: async (projectId: number): Promise<GetTasksResponse> => {
    const response = await apiClient.get<GetTasksResponse>(`/api/projects/${projectId}/tasks`);
    return response.data;
  },
  createTask: async (projectId: number, data: CreateTaskRequest): Promise<CreateTaskResponse> => {
    const response = await apiClient.post<CreateTaskResponse>(`/api/projects/${projectId}/tasks`, data);
    return response.data;
  },
  updateTaskStatus: async (taskId: number, data: UpdateTaskStatusRequest): Promise<ApiResponse<null>> => {
    const response = await apiClient.put<ApiResponse<null>>(`/api/tasks/${taskId}/status`, data);
    return response.data;
  },
  updateTaskAssignee: async (taskId: number, data: UpdateTaskAssigneeRequest): Promise<ApiResponse<null>> => {
    const response = await apiClient.put<ApiResponse<null>>(`/api/tasks/${taskId}/assigne`, data);
    return response.data;
  }
};
