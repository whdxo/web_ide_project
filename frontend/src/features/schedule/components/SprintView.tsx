import { useScheduleStore } from "../store/scheduleStore";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function SprintView() {
  const {
    currentMonth,
    selectedDate,
    nextMonth,
    prevMonth,
    selectDate,
  } = useScheduleStore();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const dates = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

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

          return (
            <button
              key={i}
              onClick={() => selectDate(fullDate)}
              className={`w-7 h-7 rounded-full text-xs ${
                isSelected
                  ? "bg-[#3545D6] text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
}
