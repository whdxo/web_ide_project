import { useEffect, useRef } from "react";
import { useTerminalStore } from "../store/terminalStore";
import { VscClearAll } from "react-icons/vsc";

export function Terminal() {
  const { lines, clear } = useTerminalStore();
  const outputRef = useRef<HTMLDivElement>(null);

  // 새 출력이 추가되면 자동 스크롤
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="h-full bg-[#181818] text-gray-300 font-mono text-xs flex flex-col">
      {/* 헤더 */}
      <div className="h-8 flex items-center justify-between border-b border-gray-800 px-3">
        <span className="text-xs text-gray-500 font-semibold">Terminal</span>
        
        {lines.length > 0 && (
          <button
            onClick={clear}
            className="p-1 rounded hover:bg-gray-700 text-gray-500 hover:text-gray-300"
            title="출력 지우기"
          >
            <VscClearAll size={14} />
          </button>
        )}
      </div>

      {/* 출력 영역 */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 space-y-1"
      >
        {lines.length === 0 ? (
          <div className="text-gray-600 text-center mt-8">
            코드를 실행하면 결과가 여기에 표시됩니다
          </div>
        ) : (
          lines.map((line) => (
            <div key={line.id} className="flex gap-2">
              <span className="text-gray-600 text-[10px] flex-shrink-0">
                {line.timestamp}
              </span>
              <span
                className={
                  line.type === "error" ? "text-red-400" : "text-green-400"
                }
              >
                {line.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}