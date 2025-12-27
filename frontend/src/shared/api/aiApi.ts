// TODO: 박유경 - Ai리뷰 API 호출
import { apiClient } from './client';
import type {
  AIReviewRequest,
  AIReviewResponse,
  AIReviewHistoryResponse,
} from '@/shared/features-types/ai.types';


export const aiApi = {
  // 코드 리뷰 요청
  reviewCode: async (data: AIReviewRequest): Promise<AIReviewResponse> => {
    const response = await apiClient.post<AIReviewResponse>(
      '/api/ai/review',
      data
    );
    return response.data;
  },

  // 리뷰 이력 조회
  getReviewHistory: async (
    filePath: string
  ): Promise<AIReviewHistoryResponse> => {
    const response = await apiClient.get<AIReviewHistoryResponse>(
      `/api/ai/review/history?filePath=${encodeURIComponent(filePath)}`
    );
    return response.data;
  },

  // 리뷰 상세 조회
  getReviewDetail: async (id: number): Promise<AIReviewResponse> => {
    const response = await apiClient.get<AIReviewResponse>(
      `/api/ai/review/${id}`
    );
    return response.data;
  },
};