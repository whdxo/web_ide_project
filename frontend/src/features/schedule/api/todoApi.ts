const API_BASE_URL = 'http://localhost:8080/api';

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

export const todoApi = {
  // 목록 조회
  async getTodos(params?: { completed?: boolean; dueDate?: string; projectId?: number }) {
    const query = new URLSearchParams();
    if (params?.completed !== undefined) {
      query.append('completed', String(params.completed));
    }
    if (params?.dueDate) {
      query.append('dueDate', params.dueDate);
    }
    if (params?.projectId) {
      query.append('projectId', String(params.projectId));
    }

    const response = await fetch(`${API_BASE_URL}/todos?${query}`);
    const data = await response.json();
    return data.data as TodoResponse[];
  },

  // 생성
  async createTodo(request: TodoCreateRequest) {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    return data.data as TodoResponse;
  },

  // 수정
  async updateTodo(todoId: number, request: TodoUpdateRequest) {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    return data.data as TodoResponse;
  },

  // 완료 토글
  async toggleTodo(todoId: number) {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}/toggle`, {
      method: 'PATCH',
    });
    const data = await response.json();
    return data.data as TodoResponse;
  },

  // 삭제
  async deleteTodo(todoId: number) {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
};
