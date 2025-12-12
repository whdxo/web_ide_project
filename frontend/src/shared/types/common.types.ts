// TODO: 박영선 - 공통 타입 정의
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}
