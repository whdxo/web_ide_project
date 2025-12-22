import { apiClient } from './client';
import type { 
  AIReviewRequest, 
  AIReviewResponse 
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
};