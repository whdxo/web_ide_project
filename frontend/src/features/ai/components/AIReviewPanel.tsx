// TODO: 박유경 - AI 리뷰 패널 컴포넌트 구현
import { useState } from "react";
import { ReviewResult } from "./ReviewResult";

export function AIReviewPanel() {
  const [code, setCode] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const handleReview = () => {
    if (!code.trim()) return;
    setHasResult(true);
  };

  return (
    <div className="flex h-full flex-col">
      {/* ===== 헤더 ===== */}
      <div className="h-10 flex items-center border-b border-gray-700 px-3">
        <h2 className="text-sm font-semibold">AI Review</h2>
      </div>

      {/* ===== 결과 영역 (스크롤) ===== */}
      <div className="flex-1 overflow-y-auto p-3">
        {!hasResult && (
          <p className="text-xs text-gray-500">
            AI 리뷰 결과가 여기에 표시됩니다.
          </p>
        )}

        {hasResult && <ReviewResult />}
      </div>

      {/* ===== 입력 영역 (하단 고정) ===== */}
      <div className="border-t border-gray-700 bg-[#181818] p-3">
        <div className="mb-2 text-xs text-gray-400">Add Content</div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="리뷰 코드를 입력해주세요..."
          className="w-full h-24 resize-none rounded bg-gray-800 p-2 text-xs outline-none"
        />

        <div className="mt-2 flex justify-end">
          <button
            onClick={handleReview}
            className="rounded bg-[#3545D6] px-4 py-1 text-xs hover:opacity-90"
          >
            입력
          </button>
        </div>
      </div>
    </div>
  );
}
