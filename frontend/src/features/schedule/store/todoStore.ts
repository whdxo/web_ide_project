import { create } from "zustand";
import { todoApi, TodoResponse } from "../api/todoApi";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  completed: boolean;
  projectName?: string;  // 백엔드에서 제공!
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;

  fetchTodos: (dueDate?: string) => Promise<void>;
  addTodo: (content: string, dueDate: string, priority: number, projectId?: number) => Promise<void>;
  updateTodo: (id: number, updates: { title?: string; priority?: number; dueDate?: string; projectId?: number }) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
}

// API 응답을 프론트 형식으로 변환
function convertToFrontendTodo(apiTodo: TodoResponse): Todo {
  return {
    id: apiTodo.id,
    title: apiTodo.content,
    priority: apiTodo.priorityLabel as "LOW" | "MEDIUM" | "HIGH",
    dueDate: apiTodo.dueDate || new Date().toISOString().slice(0, 10),
    completed: apiTodo.completed,
    projectName: apiTodo.projectName || undefined,  // 백엔드에서 제공!
  };
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async (dueDate?: string) => {
    set({ loading: true, error: null });
    try {
      const apiTodos = await todoApi.getTodos(dueDate ? { dueDate } : undefined);
      const todos = apiTodos.map(convertToFrontendTodo);
      set({ todos, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch todos", loading: false });
      console.error(error);
    }
  },

  addTodo: async (content: string, dueDate: string, priority: number, projectId?: number) => {
    set({ loading: true, error: null });
    try {
      const created = await todoApi.createTodo({ content, dueDate, priority, projectId });
      const newTodo = convertToFrontendTodo(created);
      set((state) => ({
        todos: [...state.todos, newTodo],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create todo", loading: false });
      console.error(error);
    }
  },

  updateTodo: async (id: number, updates: { title?: string; priority?: number; dueDate?: string; projectId?: number }) => {
    try {
      const request = {
        content: updates.title,
        priority: updates.priority,
        dueDate: updates.dueDate,
        projectId: updates.projectId,
      };

      const updated = await todoApi.updateTodo(id, request);
      const updatedTodo = convertToFrontendTodo(updated);

      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
      }));
    } catch (error) {
      set({ error: "Failed to update todo" });
      console.error(error);
    }
  },

  removeTodo: async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete todo" });
      console.error(error);
    }
  },

  toggleTodo: async (id: number) => {
    try {
      const updated = await todoApi.toggleTodo(id);
      const updatedTodo = convertToFrontendTodo(updated);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
      }));
    } catch (error) {
      set({ error: "Failed to toggle todo" });
      console.error(error);
    }
  },
}));
