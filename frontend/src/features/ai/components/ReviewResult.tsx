import type { AIReviewData } from '@/shared/features-types/ai.types';

interface ReviewResultProps {
  review: AIReviewData;
}

export function ReviewResult({ review }: ReviewResultProps) {
  const { score, summary, suggestions, createdAt } = review;

  return (
    <div className="space-y-4 text-xs">
      {/* 점수 */}
      <section>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">점수</h3>
          <span
            className={`px-3 py-1 rounded font-bold ${
              score >= 80
                ? 'bg-green-900/30 text-green-400'
                : score >= 60
                ? 'bg-yellow-900/30 text-yellow-400'
                : 'bg-red-900/30 text-red-400'
            }`}
          >
            {score} / 100
          </span>
        </div>
      </section>

      {/* 요약 */}
      <section>
        <h3 className="mb-1 font-semibold text-sm">요약</h3>
        <p className="text-gray-300">{summary}</p>
      </section>

      {/* 개선 제안 */}
      <section>
        <h3 className="mb-1 font-semibold text-sm">개선 제안</h3>
        <ul className="list-disc pl-4 space-y-1 text-gray-300">
          {suggestions.map((suggestion, idx) => (
            <li key={idx}>{suggestion}</li>
          ))}
        </ul>
      </section>

      {/* 날짜 */}
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
        {new Date(createdAt).toLocaleString('ko-KR')}
      </div>
    </div>
  );
}
