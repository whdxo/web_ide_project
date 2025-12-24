import { useState } from "react";
import { useScheduleStore } from "../store/scheduleStore";
import { useTodos, useCreateTodo, useDeleteTodo, useToggleTodo } from "../hooks/useTodo";
import { VscTrash } from "react-icons/vsc";

interface TodoListProps {
  isMainPage?: boolean;
}

export function TodoList({ isMainPage = false }: TodoListProps) {
  const selectedDate = useScheduleStore((s) => s.selectedDate);
  
  // 🔥 React Query로 API 호출
  const { data: todos = [], isLoading } = useTodos({ dueDate: selectedDate });
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 입력 상태
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const resetForm = () => {
    setTitle("");
    setPriority("MEDIUM");
  };

  const handleCreateTodo = () => {
    if (!title.trim()) return;

    const priorityNum = priority === "LOW" ? 0 : priority === "HIGH" ? 2 : 1;

    // 🔥 API 호출
    createTodo.mutate(
      {
        content: title,
        dueDate: selectedDate,
        priority: priorityNum,
      },
      {
        onSuccess: () => {
          resetForm();
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      {/* ===== Todo List ===== */}
      <div className="p-3 text-sm">
        <h3 className="font-semibold mb-2">Todo List</h3>

        {isLoading && (
          <p className="text-xs text-gray-400">로딩 중...</p>
        )}

        {!isLoading && todos.length === 0 && (
          <p className="text-xs text-gray-400">등록된 TODO가 없습니다.</p>
        )}

        <ul className="space-y-1">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between rounded px-2 py-1 text-xs
                ${todo.completed ? "bg-gray-900 text-gray-500" : "bg-gray-800"}
              `}
            >
              <div className="flex items-center gap-2">
                {/* 체크박스 */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo.mutate(todo.id)}
                  className="accent-blue-500"
                />

                {/* 제목 */}
                <span className={todo.completed ? "line-through" : ""}>
                  {isMainPage && todo.projectName ? (
                    <span className="font-bold text-gray-300 mr-1">
                      ({todo.projectName})
                    </span>
                  ) : null}
                  {todo.content}
                </span>
              </div>

              <button
                onClick={() => deleteTodo.mutate(todo.id)}
                className="p-1 hover:bg-red-600 rounded"
              >
                <VscTrash size={14} />
              </button>
            </li>
          ))}
        </ul>

        {!isMainPage && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-3 w-full bg-gray-700 rounded py-1 text-xs hover:bg-gray-600"
          >
            + TODO 추가
          </button>
        )}
      </div>

      {/* ===== TODO 생성 모달 ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-80 rounded-md bg-[#1f1f1f] border border-gray-700 p-4 text-sm">
            <h2 className="font-semibold mb-3">새 TODO</h2>

            {/* todo 입력 */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="TODO 입력"
              className="w-full mb-2 rounded bg-gray-800 px-2 py-1 text-xs outline-none"
              autoFocus
            />

            {/* 버튼 */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600"
              >
                취소
              </button>
              <button
                onClick={handleCreateTodo}
                className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-500"
              >
                생성
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}