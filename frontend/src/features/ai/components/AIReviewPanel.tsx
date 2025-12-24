import { useState } from "react";
import { useAIReview } from "../hooks/useAIReview";

export function AIReviewPanel() {
  const [code, setCode] = useState("");

  const { data, mutate, isPending, isSuccess } = useAIReview();

  const handleReview = () => {
    if (!code.trim()) return;
 
    mutate({
      fileId: 0, // 임시 ID
      content: code,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <div className="h-10 flex items-center border-b border-gray-700 px-3">
        <h2 className="text-sm font-semibold">AI Review</h2>
      </div>

      {/* 결과 영역 */}
      <div className="flex-1 overflow-y-auto p-3">
        {isPending && (
          <p className="text-xs text-gray-500">
            AI가 코드를 분석하고 있습니다...
          </p>
        )}

        {!isPending && !isSuccess && (
          <p className="text-xs text-gray-500">
            AI 리뷰 결과가 여기에 표시됩니다.
          </p>
        )}

        {isSuccess && data?.data && (
          <div className="mt-4 space-y-4 text-xs">
            {/* 요약 */}
            <section>
              <h3 className="mb-1 font-semibold text-sm">요약</h3>
              <p className="text-gray-300">{data.data.summary}</p>
            </section>

            {/* 이슈 */}
            <section>
              <h3 className="mb-1 font-semibold text-sm">문제점</h3>
              <ul className="list-disc pl-4 space-y-1 text-gray-300">
                {data.data.issues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </section>

            {/* 제안 */}
            <section>
              <h3 className="mb-1 font-semibold text-sm">개선 제안</h3>
              <ul className="list-disc pl-4 space-y-1 text-gray-300">
                {data.data.suggestions.map((suggestion, idx) => (
                  <li key={idx}>{suggestion}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
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
            className="rounded bg-[#3545D6] px-4 py-1 text-xs hover:opacity-90 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? "분석 중..." : "입력"}
          </button>
        </div>
      </div>
    </div>
  );
}