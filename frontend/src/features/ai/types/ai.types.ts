import type { ApiResponse } from '@/shared/types/common.types';

export interface AIReviewRequest {
  fileId: number;
  content: string;
}

export interface AIReviewResponseData {
  summary: string;
  issues: string[];
  suggestions: string[];
}

export type AIReviewResponse = ApiResponse<AIReviewResponseData>;
