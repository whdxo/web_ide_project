import { useMutation } from '@tanstack/react-query';
import { aiApi } from '@/shared/api/aiApi';
import type { AIReviewRequest } from '@/shared/features-types/ai.types';

export const useAIReview = () => {
  return useMutation({
    mutationFn: (data: AIReviewRequest) => aiApi.reviewCode(data),
  });
};