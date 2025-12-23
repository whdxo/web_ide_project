import { useState } from "react";
import type { CreateTodoRequest } from "@/shared/features-types/schedule.types";

interface Todo extends CreateTodoRequest {
  id: number;
  completed: boolean;
}

let idCounter = 1;

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = {
    mutate: (data: CreateTodoRequest, options?: any) => {
      const newTodo: Todo = {
        id: idCounter++,
        completed: false,
        ...data,
      };

      setTodos((prev) => [...prev, newTodo]);
      options?.onSuccess?.();
    },
  };

  const deleteTodo = {
    mutate: (id: number) => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    },
  };

  const toggleTodo = {
    mutate: (id: number) => {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    },
  };

  return {
    todosQuery: {
      data: {
        data: todos,
      },
    },
    createTodo,
    deleteTodo,
    toggleTodo,
  };
}
