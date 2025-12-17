import type { ApiResponse } from '@/shared/types/common.types';

export interface Sprint {
  sprintId: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface CreateSprintRequest {
  name: string;
  startDate: string;
  endDate: string;
}

export interface Todo {
  todoId: number;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}

export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assigneeId: number;
  tag: 'FE' | 'BE' | 'COMMON';
  sprintId: number;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assigneeId: number;
  tag: 'FE' | 'BE' | 'COMMON';
  sprintId: number;
}

export interface UpdateTaskStatusRequest {
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export interface UpdateTaskAssigneeRequest {
  assigneeId: number;
}

export type GetSprintsResponse = ApiResponse<Sprint[]>;
export type CreateSprintResponse = ApiResponse<Sprint>;
export type GetTodosResponse = ApiResponse<Todo[]>;
export type CreateTodoResponse = ApiResponse<Todo>;
export type GetTasksResponse = ApiResponse<Task[]>;
export type CreateTaskResponse = ApiResponse<Task>;
