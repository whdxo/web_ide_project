import { apiClient } from './client';
import type { AIReviewRequest, AIReviewResponse } from '@/features/ai/types/ai.types';

export const aiApi = {
  reviewCode: async (data: AIReviewRequest): Promise<AIReviewResponse> => {
    const response = await apiClient.post<AIReviewResponse>('/api/ai/review', data);
    return response.data;
  },
};
