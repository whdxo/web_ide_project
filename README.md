# EditUs Web IDE

다중 언어를 지원하는 온라인 코드 편집 및 실행 환경

## 🚀 주요 기능

- ✅ **9개 언어 지원**: JavaScript, Python, Java, C++, C, Go, Rust, Ruby, PHP
- ✅ **실시간 코드 실행**: Judge0 API 기반 안전한 코드 실행
- ✅ **파일/폴더 관리**: 프로젝트 기반 파일 시스템
- ✅ **에러 처리**: 문법 에러 및 런타임 에러 실시간 감지
- ✅ **JWT 인증**: 안전한 사용자 인증 시스템
- ✅ **Kakao 소셜 로그인**: 간편한 로그인

## 🛠 기술 스택

### Backend
- **Spring Boot 3.x** - REST API 서버
- **MySQL** - 데이터베이스
- **Redis** - 세션 관리
- **JWT** - 인증/인가
- **Judge0 API** - 코드 실행 엔진

### Frontend
- **React 18** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **TailwindCSS** - 스타일링

## 📦 설치 및 실행

### 1. 저장소 클론

\`\`\`bash
git clone https://github.com/whdxo/web_ide_project.git
cd web_ide_project
\`\`\`

### 2. 환경변수 설정

\`\`\`bash
# .env 파일 생성
cp .env.example .env

# .env 파일을 열어서 API 키 입력
# 필수: JUDGE0_API_KEY, OPENAI_API_KEY (선택사항)
\`\`\`

**중요한 환경변수:**

- \`JUDGE0_API_KEY\`: [RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce)에서 발급
- \`OPENAI_API_KEY\`: [OpenAI](https://platform.openai.com/api-keys)에서 발급 (AI 리뷰 기능용, 선택사항)
- \`KAKAO_CLIENT_ID\`: [Kakao Developers](https://developers.kakao.com)에서 발급 (소셜 로그인용, 선택사항)

### 3. 실행 방법

#### 방법 1: 자동 실행 (권장)

\`\`\`bash
# 루트 디렉토리에서
npm install
npm run start  # MySQL + Backend + Frontend 모두 실행
\`\`\`

#### 방법 2: 개별 실행

\`\`\`bash
# 1. MySQL 실행
npm run mysql

# 2. Backend 실행
cd backend
source ../.env  # 환경변수 로드
./gradlew bootRun

# 3. Frontend 실행 (새 터미널)
cd frontend
npm install
npm run dev
\`\`\`

### 4. 접속

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **MySQL**: localhost:3307

## 🧪 테스트 결과

모든 핵심 기능 테스트 통과 (14/14, 100%)

| 항목 | 상태 | 비고 |
|------|------|------|
| 파일 생성 | ✅ | 정상 작동 |
| 폴더 생성 | ✅ | 정상 작동 |
| JavaScript 실행 | ✅ | 0.017초 |
| Python 실행 | ✅ | 0.008초 |
| Java 실행 | ✅ | 0.032초 |
| C++ 실행 | ✅ | 0.002초 |
| C 실행 | ✅ | 0.001초 |
| Go 실행 | ✅ | 0.001초 |
| Rust 실행 | ✅ | 0.002초 |
| Ruby 실행 | ✅ | 0.026초 |
| PHP 실행 | ✅ | 0.005초 |
| 파일 삭제 | ✅ | 정상 작동 |
| 문법 에러 처리 | ✅ | SyntaxError 감지 |
| 런타임 에러 처리 | ✅ | RuntimeError 감지 |

## 📡 API 엔드포인트

### 인증
- `POST /api/users/join` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `POST /api/auth/refresh` - 토큰 갱신

### 프로젝트
- `GET /api/projects` - 프로젝트 목록
- `POST /api/projects` - 프로젝트 생성
- `GET /api/projects/{id}` - 프로젝트 상세
- `DELETE /api/projects/{id}` - 프로젝트 삭제

### 파일 시스템
- `POST /api/projects/{id}/files` - 파일 생성
- `POST /api/projects/{id}/folders` - 폴더 생성
- `GET /api/files/{id}` - 파일 조회
- `PUT /api/files/{id}` - 파일 수정
- `DELETE /api/projects/{id}/files/{fileId}` - 파일 삭제

### 코드 실행
- `POST /api/code/execute` - 코드 실행

## 🔧 트러블슈팅

### Judge0 API 오류

\`\`\`
403 Forbidden - You are not subscribed to this API
\`\`\`

**해결 방법:**
1. [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce) 방문
2. 무료 또는 유료 플랜 구독
3. API 키를 \`.env\` 파일에 추가

### 환경변수 로드 안됨

**Linux/Mac:**
\`\`\`bash
source .env
./gradlew bootRun
\`\`\`

**Windows:**
\`\`\`bash
# PowerShell
Get-Content .env | ForEach-Object { $var = $_.Split('='); [Environment]::SetEnvironmentVariable($var[0], $var[1]) }
.\gradlew.bat bootRun
\`\`\`

### MySQL 연결 오류

\`\`\`bash
# Docker 컨테이너 확인
docker ps | grep mysql

# MySQL 재시작
docker-compose restart mysql
\`\`\`

## 👥 팀원

- **EditUs Team**

## 📄 라이선스

ISC License

## 🔗 링크

- **Repository**: https://github.com/whdxo/web_ide_project
- **Judge0 API**: https://judge0.com
- **RapidAPI**: https://rapidapi.com
