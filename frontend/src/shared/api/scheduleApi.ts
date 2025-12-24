import { apiClient } from './client';
import type { ApiResponse } from '@/shared/types/common.types';
import type { 
  GetSprintsResponse, 
  CreateSprintRequest, 
  CreateSprintResponse, 
  GetTasksResponse, 
  CreateTaskRequest, 
  CreateTaskResponse, 
  UpdateTaskStatusRequest, 
  UpdateTaskAssigneeRequest 
} from '@/shared/features-types/schedule.types';

// ===== 백엔드 TODO 응답 형식 =====
interface TodoApiResponse<T> {
  success: boolean;
  data: T;
}

export interface TodoResponse {
  id: number;
  content: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
  priority: number;
  priorityLabel: string;
  projectName: string | null;
  projectId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TodoCreateRequest {
  content: string;
  dueDate?: string;
  priority?: number;
  projectId?: number;
}

export interface TodoUpdateRequest {
  content?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: number;
  projectId?: number;
}


export const scheduleApi = {
  // ===== Sprints =====
  getSprints: async (projectId: number): Promise<GetSprintsResponse> => {
    const response = await apiClient.get<GetSprintsResponse>(`/api/projects/${projectId}/sprints`);
    return response.data;
  },
  createSprint: async (projectId: number, data: CreateSprintRequest): Promise<CreateSprintResponse> => {
    const response = await apiClient.post<CreateSprintResponse>(`/api/projects/${projectId}/sprints`, data);
    return response.data;
  },

  // ===== Personal TODOs (백엔드 연동) =====
  getTodos: async (params?: {
    completed?: boolean;
    dueDate?: string;
    projectId?: number;
  }): Promise<TodoResponse[]> => {
    const response = await apiClient.get<TodoApiResponse<TodoResponse[]>>('/api/todos', { params });
    return response.data.data;
  },

  createTodo: async (data: TodoCreateRequest): Promise<TodoResponse> => {
    const response = await apiClient.post<TodoApiResponse<TodoResponse>>('/api/todos', data);
    return response.data.data;
  },

  updateTodo: async (todoId: number, data: TodoUpdateRequest): Promise<TodoResponse> => {
    const response = await apiClient.put<TodoApiResponse<TodoResponse>>(`/api/todos/${todoId}`, data);
    return response.data.data;
  },

  toggleTodo: async (todoId: number): Promise<TodoResponse> => {
    const response = await apiClient.patch<TodoApiResponse<TodoResponse>>(`/api/todos/${todoId}/toggle`);
    return response.data.data;
  },

  deleteTodo: async (todoId: number): Promise<void> => {
    await apiClient.delete(`/api/todos/${todoId}`);
  },

  // ===== Team Tasks =====
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