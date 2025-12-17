import { create } from "zustand";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  completed: boolean;
  projectName?: string; // 프로젝트명 추가
}

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id" | "completed">) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

// 초기 Mock Data
const INITIAL_TODOS: Todo[] = [
  {
    id: 1,
    title: "와이어프레임 작업 진행하기1",
    priority: "HIGH",
    dueDate: new Date().toISOString().slice(0, 10),
    completed: false,
    projectName: "Web IDE Project",
  },
  {
    id: 2,
    title: "와이어프레임 작업 진행하기2",
    priority: "MEDIUM",
    dueDate: new Date().toISOString().slice(0, 10),
    completed: false,
    projectName: "Travel",
  },
  {
    id: 3,
    title: "와이어프레임 작업 진행하기3",
    priority: "LOW",
    dueDate: new Date().toISOString().slice(0, 10),
    completed: false,
    projectName: "Dream",
  },
];

export const useTodoStore = create<TodoState>((set) => ({
  todos: INITIAL_TODOS,
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          completed: false,
          ...todo,
        },
      ],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),
}));
