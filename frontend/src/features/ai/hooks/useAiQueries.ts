import { useMutation } from '@tanstack/react-query';
import { aiApi } from '../api/aiApi';

export const useAIReview = () => {
  return useMutation({
    mutationFn: aiApi.reviewCode,
  });
};
