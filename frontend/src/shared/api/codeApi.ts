import { apiClient } from './client';
import type {
  CodeExecutionRequest,
  CodeExecutionResponse,
} from '@/shared/features-types/code.types';

/**
 * 코드 실행 API
 */
export const codeApi = {
  /**
   * 코드 실행
   * @param data - 코드, 언어, 입력값
   * @returns 실행 결과 (출력, 에러, 상태, 실행 시간)
   */
  executeCode: async (
    data: CodeExecutionRequest
  ): Promise<CodeExecutionResponse> => {
    const response = await apiClient.post<CodeExecutionResponse>(
      '/api/code/execute',
      data
    );
    return response.data;
  },
};