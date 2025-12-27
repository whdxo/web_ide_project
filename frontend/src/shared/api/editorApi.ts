// TODO: 박유경 - 에디터 API 호출
// TODO: 박유경 - 에디터 API 호출
import { apiClient } from './client';
import type { ApiResponse } from '@/shared/types/common.types';

export interface CodeExecuteRequest {
  code: string;
  language: string;
}

export interface CodeExecuteResponse {
  output: string;
  error?: string;
  exitCode: number;
}

export const editorApi = {
  // 코드 실행
  executeCode: async (data: CodeExecuteRequest): Promise<ApiResponse<CodeExecuteResponse>> => {
    const response = await apiClient.post<ApiResponse<CodeExecuteResponse>>(
      '/api/code/execute',
      data
    );
    return response.data;
  },
};
