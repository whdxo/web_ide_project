import { useEffect, useState } from "react";
import { useScheduleStore } from "../store/scheduleStore";
import { useTodoStore } from "../store/todoStore";
import { todoApi, TodoResponse } from "../api/todoApi";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function SprintView() {
  const {
    currentMonth,
    selectedDate,
    nextMonth,
    prevMonth,
    selectDate,
  } = useScheduleStore();

  // TodoList에서 todo가 변경되었는지 감지하기 위해 todos 구독
  const { todos } = useTodoStore();

  // 캘린더 표시용 전체 todos (선택된 날짜와 무관하게 모든 todos)
  const [allTodos, setAllTodos] = useState<TodoResponse[]>([]);

  // 전체 todos 가져오기 (월 변경 또는 todo 변경 시)
  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        // dueDate 파라미터 없이 호출하면 전체 todos 가져옴
        const todos = await todoApi.getTodos();
        setAllTodos(todos);
      } catch (error) {
        console.error('Failed to fetch todos for calendar:', error);
      }
    };
    fetchAllTodos();
  }, [currentMonth, todos]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const dates = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  // 특정 날짜에 일정이 있는지 확인하는 함수
  const hasEventsOnDate = (dateString: string) => {
    return allTodos.some((todo) => todo.dueDate === dateString);
  };

  return (
    <div className="border-b border-gray-700">
      {/* header */}
      <div className="h-10 flex items-center border-b border-gray-700 px-3">
        <h2 className="text-sm font-semibold">
          일정 / Todo
        </h2>
      </div>

      {/* 캘린더 */}
      <div className="p-3 text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">
            {year}년 {month + 1}월
          </span>
          <div className="flex gap-1">
            <button onClick={prevMonth}>▲</button>
            <button onClick={nextMonth}>▼</button>
          </div>
        </div>
      </div>
      {/* 요일 */}
      <div className="grid grid-cols-7 text-center text-xs mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-gray-400">
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {dates.map((date, i) => {
          if (!date) return <div key={i} />;

          const fullDate = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(date).padStart(2, "0")}`;

          const isSelected = selectedDate === fullDate;
          const hasEvents = hasEventsOnDate(fullDate);

          return (
            <div key={i} className="flex flex-col items-center">
              <button
                onClick={() => selectDate(fullDate)}
                className={`w-7 h-7 rounded-full text-xs ${
                  isSelected
                    ? "bg-[#3545D6] text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                {date}
              </button>
              {/* 일정이 있는 날짜에 동그라미 표시 */}
              {hasEvents && (
                <div className="w-1 h-1 rounded-full bg-blue-400 mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
