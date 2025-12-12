export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
