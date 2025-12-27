/**
 * 코드 실행 API 타입 정의
 */

// 코드 실행 요청
export interface CodeExecutionRequest {
  code: string;
  language: string;
  input?: string;
}

// 코드 실행 응답 데이터
export interface CodeExecutionData {
  output: string;
  error: string;
  exitCode: number;
  status: string;
  time: number;
}

// API 응답 (공통 ApiResponse 래퍼)
export interface CodeExecutionResponse {
  success: boolean;
  data: CodeExecutionData | null;
  message: string | null;
}