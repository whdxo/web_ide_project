import { create } from 'zustand';
import type {
  AIReviewData,
  AIReviewHistoryData,
  AIReviewRequest,
} from '@/shared/features-types/ai.types';
import { aiApi } from '@/shared/api/aiApi';

interface AIState {
  currentReview: AIReviewData | null;
  reviewHistory: AIReviewHistoryData[];
  loading: boolean;
  error: string | null;
  activeTab: 'current' | 'history';

  requestReview: (request: AIReviewRequest) => Promise<void>;
  fetchHistory: (filePath: string) => Promise<void>;
  fetchDetail: (id: number) => Promise<void>;
  setActiveTab: (tab: 'current' | 'history') => void;
  reset: () => void;
}

export const useAIStore = create<AIState>((set, get) => ({
  currentReview: null,
  reviewHistory: [],
  loading: false,
  error: null,
  activeTab: 'current',

  requestReview: async (request) => {
    set({ loading: true, error: null });
    try {
      const response = await aiApi.reviewCode(request);
      if (response.success && response.data) {
        set({ currentReview: response.data, activeTab: 'current' });
        // 리뷰 성공 시 이력 갱신
        await get().fetchHistory(request.filePath);
      }
    } catch (err: any) {
      set({ error: err.message || 'AI 리뷰 요청 실패' });
    } finally {
      set({ loading: false });
    }
  },

  fetchHistory: async (filePath) => {
    try {
      const response = await aiApi.getReviewHistory(filePath);
      if (response.success && response.data) {
        set({ reviewHistory: response.data });
      }
    } catch (err: any) {
      console.error('이력 조회 실패:', err);
    }
  },

  fetchDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await aiApi.getReviewDetail(id);
      if (response.success && response.data) {
        set({ currentReview: response.data, activeTab: 'current' });
      }
    } catch (err: any) {
      set({ error: err.message || '리뷰 상세 조회 실패' });
    } finally {
      set({ loading: false });
    }
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  reset: () =>
    set({
      currentReview: null,
      reviewHistory: [],
      error: null,
    }),
}));
