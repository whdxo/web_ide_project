// 터미널 출력 라인
export interface TerminalLine {
  id: string;
  content: string;
  type: 'input' | 'output' | 'error';
  timestamp: string;
}

// 터미널 세션
export interface TerminalSession {
  id: string;
  projectId: number;
  isActive: boolean;
  lines: TerminalLine[];
}

// 터미널 명령어 실행 요청 (향후 백엔드 연동 시)
export interface ExecuteCommandRequest {
  command: string;
  projectId: number;
}

// 터미널 테마
export type TerminalTheme = 'dark' | 'light';