interface Review {
  id: string;
  content: string;
  rating: number;
}

export const useAIReview = (): { review: Review | null } => {
  return { review: null };
};
