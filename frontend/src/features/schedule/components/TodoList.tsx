import { useState, useEffect } from "react";
import { useScheduleStore } from "../store/scheduleStore";
import { useTodoStore } from "../store/todoStore";
import { VscTrash } from "react-icons/vsc";

interface TodoListProps {
  isMainPage?: boolean;
}

export function TodoList({ isMainPage = false }: TodoListProps) {
  const selectedDate = useScheduleStore((s) => s.selectedDate);
  const { todos, loading, fetchTodos, addTodo, updateTodo, removeTodo, toggleTodo } = useTodoStore();

  // 선택된 날짜가 변경될 때마다 Todo 조회
  useEffect(() => {
    fetchTodos(selectedDate);
  }, [selectedDate, fetchTodos]);

  const todayTodos = todos; // 이미 서버에서 필터링되어 옴

  // 🔹 필터 상태
  const [filter, setFilter] = useState<"ALL" | "INCOMPLETE" | "COMPLETED">("ALL");

  // 필터링된 todos
  const filteredTodos = todayTodos.filter((todo) => {
    if (filter === "INCOMPLETE") return !todo.completed;
    if (filter === "COMPLETED") return todo.completed;
    return true; // ALL
  });

  // 🔹 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 생성 모달 입력 상태
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const resetForm = () => {
    setTitle("");
    setPriority("MEDIUM");
  };

  const handleCreateTodo = async () => {
    if (!title.trim()) return;

    const priorityNum = priority === "LOW" ? 0 : priority === "HIGH" ? 2 : 1;

    await addTodo(title, selectedDate, priorityNum);

    resetForm();
    setIsModalOpen(false);
  };

  // 🔹 수정 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<typeof todos[0] | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const handleEditClick = (todo: typeof todos[0]) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
    setIsEditModalOpen(true);
  };

  const handleUpdateTodo = async () => {
    if (!editingTodo || !editTitle.trim()) return;

    const priorityNum = editPriority === "LOW" ? 0 : editPriority === "HIGH" ? 2 : 1;

    await updateTodo(editingTodo.id, {
      title: editTitle,
      priority: priorityNum,
    });

    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  // 우선순위 색상 매핑 함수
  const getPriorityColor = (priority: "LOW" | "MEDIUM" | "HIGH") => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      {/* ===== Todo List ===== */}
      <div className="p-3 text-sm">
        <h3 className="font-semibold mb-2">Todo List</h3>

        {/* 필터 버튼 */}
        {!isMainPage && todayTodos.length > 0 && (
          <div className="flex gap-1 mb-2">
            {(["ALL", "INCOMPLETE", "COMPLETED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 px-2 py-1 text-xs rounded ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {f === "ALL" ? "전체" : f === "INCOMPLETE" ? "미완료" : "완료"}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <p className="text-xs text-gray-400">
            로딩 중...
          </p>
        )}

        {!loading && todayTodos.length === 0 && (
          <p className="text-xs text-gray-400">
            등록된 TODO가 없습니다.
          </p>
        )}

        {!loading && todayTodos.length > 0 && filteredTodos.length === 0 && (
          <p className="text-xs text-gray-400">
            해당 조건의 TODO가 없습니다.
          </p>
        )}

        <ul className="space-y-1">
          {filteredTodos.map((todo) => (
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
                  onChange={() => toggleTodo(todo.id)}
                  className="accent-blue-500"
                />

                {/* 우선순위 색상 인디케이터 */}
                <div
                  className={`w-2 h-2 rounded-full ${getPriorityColor(todo.priority)}`}
                  title={`우선순위: ${todo.priority}`}
                />

                {/* 제목 */}
                <span
                  className={todo.completed ? "line-through" : ""}
                >
                  {isMainPage && todo.projectName ? (
                    <span className="font-bold text-gray-300 mr-1">
                      ({todo.projectName})
                    </span>
                  ) : null}
                  {todo.title}
                </span>
              </div>

              <div className="flex gap-1">
                {/* 수정 버튼 */}
                <button
                  onClick={() => handleEditClick(todo)}
                  className="p-1 hover:bg-blue-600 rounded"
                  title="수정"
                >
                  ✏️
                </button>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="p-1 hover:bg-red-600 rounded"
                  title="삭제"
                >
                  <VscTrash size={14} />
                </button>
              </div>
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

            {/* 우선순위 선택 */}
            <div className="mb-3">
              <label className="text-xs text-gray-400 mb-1 block">우선순위</label>
              <div className="flex gap-2">
                {(["LOW", "MEDIUM", "HIGH"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 px-2 py-1 text-xs rounded ${
                      priority === p
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

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

      {/* ===== TODO 수정 모달 ===== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-80 rounded-md bg-[#1f1f1f] border border-gray-700 p-4 text-sm">
            <h2 className="font-semibold mb-3">TODO 수정</h2>

            {/* todo 입력 */}
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="TODO 입력"
              className="w-full mb-2 rounded bg-gray-800 px-2 py-1 text-xs outline-none"
              autoFocus
            />

            {/* 우선순위 선택 */}
            <div className="mb-3">
              <label className="text-xs text-gray-400 mb-1 block">우선순위</label>
              <div className="flex gap-2">
                {(["LOW", "MEDIUM", "HIGH"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setEditPriority(p)}
                    className={`flex-1 px-2 py-1 text-xs rounded ${
                      editPriority === p
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingTodo(null);
                }}
                className="px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600"
              >
                취소
              </button>
              <button
                onClick={handleUpdateTodo}
                className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-500"
              >
                수정
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}