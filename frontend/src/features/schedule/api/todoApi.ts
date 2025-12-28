import { apiClient } from '@/shared/api/client';

export interface TodoCreateRequest {
  content: string;
  dueDate?: string; // ISO 8601 format: "2024-12-20"
  priority?: number; // 0, 1, 2
  projectId?: number; // 프로젝트 ID (nullable)
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
  title: string; // content와 동일 (호환용)
  completed: boolean;
  dueDate: string | null;
  priority: number;
  priorityLabel: string; // "LOW", "MEDIUM", "HIGH"
  projectName: string | null;  // 프로젝트명
  projectId: number | null;
  createdAt: string;
  updatedAt: string;
}

interface TodoApiResponse<T> {
  success: boolean;
  data: T;
}

export const todoApi = {
  // 목록 조회
  async getTodos(params?: { completed?: boolean; dueDate?: string; projectId?: number }): Promise<TodoResponse[]> {
    const response = await apiClient.get<TodoApiResponse<TodoResponse[]>>('/api/todos', { params });
    return response.data.data;
  },

  // 생성
  async createTodo(request: TodoCreateRequest): Promise<TodoResponse> {
    const response = await apiClient.post<TodoApiResponse<TodoResponse>>('/api/todos', request);
    return response.data.data;
  },

  // 수정
  async updateTodo(todoId: number, request: TodoUpdateRequest): Promise<TodoResponse> {
    const response = await apiClient.put<TodoApiResponse<TodoResponse>>(`/api/todos/${todoId}`, request);
    return response.data.data;
  },

  // 완료 토글
  async toggleTodo(todoId: number): Promise<TodoResponse> {
    const response = await apiClient.patch<TodoApiResponse<TodoResponse>>(`/api/todos/${todoId}/toggle`);
    return response.data.data;
  },

  // 삭제
  async deleteTodo(todoId: number): Promise<void> {
    await apiClient.delete(`/api/todos/${todoId}`);
  },
};
