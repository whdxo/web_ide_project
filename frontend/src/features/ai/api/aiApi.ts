import { apiClient } from '@/shared/utils/api';
import type { AIReviewRequest, AIReviewResponse } from '../types/ai.types';

export const aiApi = {
  reviewCode: async (data: AIReviewRequest): Promise<AIReviewResponse> => {
    const response = await apiClient.post<AIReviewResponse>('/api/ai/review', data);
    return response.data;
  },
};
