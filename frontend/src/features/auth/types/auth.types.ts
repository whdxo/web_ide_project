// TODO: 박영선 - 인증 관련 타입 정의
export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
