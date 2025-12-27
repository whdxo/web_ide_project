import { useAIReview } from '../hooks/useAIReview';
import { ReviewResult } from './ReviewResult';

export function AIReviewPanel() {
  const {
    activeFile,
    currentReview,
    reviewHistory,
    loading,
    error,
    activeTab,
    handleRequestReview,
    fetchDetail,
    setActiveTab,
  } = useAIReview();

  return (
    <div className="flex h-full flex-col">
      {/* 헤더 */}
      <div className="h-10 flex items-center border-b border-gray-700 px-3">
        <h2 className="text-sm font-semibold">AI Review</h2>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 text-xs ${
            activeTab === 'current'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400'
          }`}
        >
          현재 리뷰
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-xs ${
            activeTab === 'history'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400'
          }`}
        >
          이력 ({reviewHistory.length})
        </button>
      </div>

      {/* 내용 영역 */}
      <div className="flex-1 overflow-y-auto p-3">
        {!activeFile && (
          <p className="text-xs text-gray-500">파일을 먼저 열어주세요</p>
        )}

        {activeFile && activeTab === 'current' && (
          <div className="space-y-3">
            {/* 파일 정보 */}
            <div className="rounded bg-gray-800 p-2 text-xs text-gray-400">
              <div>파일: {activeFile.name}</div>
              <div>경로: {activeFile.path}</div>
            </div>

            {/* 리뷰 요청 버튼 */}
            <button
              onClick={handleRequestReview}
              disabled={loading}
              className="w-full rounded bg-blue-600 px-4 py-2 text-xs hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '분석 중...' : 'AI 리뷰 요청'}
            </button>

            {/* 에러 메시지 */}
            {error && (
              <div className="rounded bg-red-900/20 p-2 text-xs text-red-400">
                {error}
              </div>
            )}

            {/* 리뷰 결과 */}
            {currentReview && <ReviewResult review={currentReview} />}

            {!currentReview && !loading && (
              <p className="text-xs text-gray-500">
                AI 리뷰 결과가 여기에 표시됩니다
              </p>
            )}
          </div>
        )}

        {activeFile && activeTab === 'history' && (
          <div className="space-y-2">
            {reviewHistory.length === 0 && (
              <p className="text-xs text-gray-500">리뷰 이력이 없습니다</p>
            )}

            {reviewHistory.map((review) => (
              <div
                key={review.id}
                onClick={() => fetchDetail(review.id)}
                className="cursor-pointer rounded bg-gray-800 p-3 hover:bg-gray-700"
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      review.score >= 80
                        ? 'bg-green-900/30 text-green-400'
                        : review.score >= 60
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-red-900/30 text-red-400'
                    }`}
                  >
                    {review.score}점
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {review.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}