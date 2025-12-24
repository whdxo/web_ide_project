import { apiClient } from '@/shared/api/client';

export interface TodoCreateRequest {
  content: string;
  dueDate?: string; // YYYY-MM-DD
  priority?: number; // 0=LOW, 1=MEDIUM, 2=HIGH
  projectId?: number;
}

export interface TodoUpdateRequest {
  content?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: number;
  projectId?: number;
}

export interface TodoResponse {
  id: number;
  content: string;
  title: string; // content와 동일
  completed: boolean;
  dueDate: string | null;
  priority: number;
  priorityLabel: string; // LOW/MEDIUM/HIGH
  projectName: string | null;
  projectId: number | null;
  createdAt: string;
  updatedAt: string;
}

interface TodoApiResponse {
  success: boolean;
  data: TodoResponse[] | TodoResponse;
}

export const todoApi = {
  // 목록 조회
  getTodos: async (params?: {
    completed?: boolean;
    dueDate?: string;
    projectId?: number;
  }): Promise<TodoResponse[]> => {
    const response = await apiClient.get<TodoApiResponse>('/api/todos', { params });
    return Array.isArray(response.data.data) ? response.data.data : [];
  },

  // 생성
  createTodo: async (request: TodoCreateRequest): Promise<TodoResponse> => {
    const response = await apiClient.post<TodoApiResponse>('/api/todos', request);
    return response.data.data as TodoResponse;
  },

  // 수정
  updateTodo: async (
    todoId: number,
    request: TodoUpdateRequest
  ): Promise<TodoResponse> => {
    const response = await apiClient.put<TodoApiResponse>(
      `/api/todos/${todoId}`,
      request
    );
    return response.data.data as TodoResponse;
  },

  // 완료 토글
  toggleTodo: async (todoId: number): Promise<TodoResponse> => {
    const response = await apiClient.patch<TodoApiResponse>(
      `/api/todos/${todoId}/toggle`
    );
    return response.data.data as TodoResponse;
  },

  // 삭제
  deleteTodo: async (todoId: number): Promise<void> => {
    await apiClient.delete(`/api/todos/${todoId}`);
  },
};