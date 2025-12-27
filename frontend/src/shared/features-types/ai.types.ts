import type { ApiResponse } from '@/shared/types/common.types';

// 리뷰 요청
export interface AIReviewRequest {
  fileName: string;
  filePath: string;
  fileContent: string;
}

// 리뷰 응답 (상세)
export interface AIReviewData {
  id: number;
  score: number;
  summary: string;
  suggestions: string[];
  createdAt: string;
}

// 이력 목록
export interface AIReviewHistoryData {
  id: number;
  fileName: string;
  score: number;
  summary: string;
  createdAt: string;
}

export type AIReviewTab = 'current' | 'history';

export type AIReviewResponse = ApiResponse<AIReviewData>;
export type AIReviewHistoryResponse = ApiResponse<AIReviewHistoryData[]>;
