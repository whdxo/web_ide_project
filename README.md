<div align="center">

# 🚀 EditUs

### 팀 협업을 위한 올인원 개발 플랫폼

**코드 작성부터 프로젝트 관리까지, 한 곳에서.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-goormeditus.com-brightgreen?style=for-the-badge)](https://goormeditus.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/whdxo/web_ide_project)

</div>

---

## ✨ 주요 기능

### 💻 웹 기반 IDE
- 🌍 **9개 프로그래밍 언어 지원** - JavaScript, Python, Java, C++, C, Go, Rust, Ruby, PHP
- ⚡ **실시간 코드 실행** - Judge0 API 기반 안전한 샌드박스 환경
- 📝 **Monaco Editor** - VS Code와 동일한 편집 경험
- 🎨 **문법 하이라이팅 & 자동완성**

### 👥 실시간 협업
- 💬 **팀 채팅** - WebSocket 기반 실시간 메시징
- 📊 **프로젝트 관리** - 여러 프로젝트를 한눈에 관리
- 📁 **파일 시스템** - 폴더/파일 생성, 수정, 삭제
- 🔄 **자동 저장** - 코드 작업 중 자동으로 저장

### 📅 일정 관리
- ✅ **투두리스트** - 작업 목록 추적
- 🎯 **스프린트 보드** - 애자일 방식의 작업 관리
- 📌 **태스크 보드** - 칸반 스타일의 작업 관리

### 🤖 AI 코드 리뷰
- 🔍 **자동 코드 분석** - AI 기반 코드 품질 검토
- 💡 **개선 제안** - 최적화 및 베스트 프랙티스 제안

### 🔐 보안 & 인증
- 🔑 **JWT 인증** - 안전한 토큰 기반 인증
- 🎫 **카카오 소셜 로그인** - 간편한 소셜 로그인
- 🛡️ **Spring Security** - 엔터프라이즈급 보안

---

## 🛠 기술 스택

<table>
<tr>
<td width="50%">

### 🎨 Frontend
- **React 19** - 최신 UI 프레임워크
- **TypeScript** - 타입 안전성
- **Vite** - 초고속 빌드 도구
- **TailwindCSS v4** - 유틸리티 퍼스트 CSS
- **Monaco Editor** - VS Code 에디터
- **Zustand** - 경량 상태 관리
- **TanStack Query** - 서버 상태 관리
- **React Router v7** - SPA 라우팅
- **WebSocket (STOMP)** - 실시간 통신

</td>
<td width="50%">

### ⚙️ Backend
- **Spring Boot 3.x** - Java 엔터프라이즈 프레임워크
- **Spring Security** - 인증/인가
- **Spring Data JPA** - ORM
- **MySQL** - 관계형 데이터베이스
- **Redis** - 인메모리 캐시
- **JWT** - 토큰 기반 인증
- **WebSocket** - 실시간 양방향 통신
- **Judge0 API** - 코드 실행 엔진
- **Docker** - 컨테이너화

</td>
</tr>
</table>

---

## 🎯 사용 방법

### 1️⃣ 회원가입 & 로그인
1. [goormeditus.com](https://goormeditus.com) 접속
2. 이메일로 가입하거나 카카오 계정으로 간편 로그인
3. 로그인 후 대시보드 진입

### 2️⃣ 프로젝트 생성
1. 대시보드에서 **"새 프로젝트"** 버튼 클릭
2. 프로젝트 이름과 설명 입력
3. 원하는 언어 선택 (여러 언어 혼용 가능)

### 3️⃣ 코드 작성 & 실행
1. 왼쪽 파일 트리에서 **새 파일 생성** 또는 **폴더 생성**
2. Monaco Editor에서 코드 작성 (자동완성, 문법 하이라이팅 지원)
3. 상단 **"실행"** 버튼 클릭 → 우측 콘솔에서 결과 확인
4. 코드는 자동으로 저장됩니다

### 4️⃣ 팀 협업
- **💬 실시간 채팅**: 우측 채팅 패널에서 팀원과 대화
- **✅ 작업 관리**: 투두리스트 또는 스프린트 보드에서 작업 할당 및 추적
- **🤖 AI 리뷰**: 코드 작성 후 AI 리뷰 요청으로 피드백 받기

### 5️⃣ 프로젝트 초대
1. 프로젝트 설정에서 **"팀원 초대"** 클릭
2. 팀원의 이메일 입력 또는 초대 링크 공유
3. 팀원이 수락하면 실시간 협업 시작

---

## 💻 로컬 개발 환경 설정

### 빠른 시작 (Quick Start)

```bash
# 1. 저장소 클론
git clone https://github.com/whdxo/web_ide_project.git
cd web_ide_project

# 2. 환경변수 설정
cp .env.example .env
# .env 파일을 열어서 API 키 입력 (아래 참고)

# 3. 전체 실행 (MySQL + Backend + Frontend)
npm install
npm run start
```

**접속 주소**
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:8080
- 🗄️ MySQL: localhost:3307

### 환경변수 설정

`.env` 파일에 다음 키를 추가하세요:

| 키 | 설명 | 필수 여부 | 발급 링크 |
|---|---|---|---|
| `JUDGE0_API_KEY` | 코드 실행 엔진 | ✅ 필수 | [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce) |
| `OPENAI_API_KEY` | AI 코드 리뷰 | ⚪ 선택 | [OpenAI API Keys](https://platform.openai.com/api-keys) |
| `KAKAO_CLIENT_ID` | 카카오 소셜 로그인 | ⚪ 선택 | [Kakao Developers](https://developers.kakao.com) |

<details>
<summary><b>개별 실행 방법 (고급)</b></summary>

```bash
# 1. MySQL만 실행
npm run mysql

# 2. Backend 실행 (새 터미널)
cd backend
source ../.env
./gradlew bootRun

# 3. Frontend 실행 (새 터미널)
cd frontend
npm install
npm run dev
```

</details>

---

## 🧪 테스트 결과

<div align="center">

**모든 핵심 기능 테스트 통과 ✅**
**14/14 (100%)**

</div>

<table>
<tr>
<td width="33%">

**📁 파일 시스템**
- ✅ 파일 생성
- ✅ 폴더 생성
- ✅ 파일 삭제

</td>
<td width="33%">

**⚡ 코드 실행**
- ✅ JavaScript (0.017s)
- ✅ Python (0.008s)
- ✅ Java (0.032s)
- ✅ C++ (0.002s)
- ✅ C (0.001s)

</td>
<td width="33%">

**🔍 언어 지원**
- ✅ Go (0.001s)
- ✅ Rust (0.002s)
- ✅ Ruby (0.026s)
- ✅ PHP (0.005s)
- ✅ 에러 처리

</td>
</tr>
</table>

---

## 📡 API 문서

<details>
<summary><b>🔐 인증 API</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/join` | 회원가입 |
| `POST` | `/api/auth/login` | 로그인 |
| `POST` | `/api/auth/logout` | 로그아웃 |
| `POST` | `/api/auth/refresh` | 토큰 갱신 |

</details>

<details>
<summary><b>📂 프로젝트 API</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | 프로젝트 목록 조회 |
| `POST` | `/api/projects` | 프로젝트 생성 |
| `GET` | `/api/projects/{id}` | 프로젝트 상세 조회 |
| `DELETE` | `/api/projects/{id}` | 프로젝트 삭제 |

</details>

<details>
<summary><b>📄 파일 시스템 API</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/projects/{id}/files` | 파일 생성 |
| `POST` | `/api/projects/{id}/folders` | 폴더 생성 |
| `GET` | `/api/files/{id}` | 파일 조회 |
| `PUT` | `/api/files/{id}` | 파일 수정 |
| `DELETE` | `/api/projects/{id}/files/{fileId}` | 파일 삭제 |

</details>

<details>
<summary><b>⚡ 코드 실행 API</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/code/execute` | 코드 실행 요청 |

</details>

---

## 🔧 트러블슈팅

<details>
<summary><b>❌ Judge0 API 오류 (403 Forbidden)</b></summary>

**문제:** `403 Forbidden - You are not subscribed to this API`

**해결 방법:**
1. [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce) 페이지 방문
2. 무료 또는 유료 플랜 구독
3. API 키를 `.env` 파일에 추가

</details>

<details>
<summary><b>⚠️ 환경변수 로드 안됨</b></summary>

**Linux/Mac:**
```bash
source .env
./gradlew bootRun
```

**Windows (PowerShell):**
```powershell
Get-Content .env | ForEach-Object {
    $var = $_.Split('=');
    [Environment]::SetEnvironmentVariable($var[0], $var[1])
}
.\gradlew.bat bootRun
```

</details>

<details>
<summary><b>🗄️ MySQL 연결 오류</b></summary>

```bash
# Docker 컨테이너 확인
docker ps | grep mysql

# MySQL 재시작
docker-compose restart mysql
```

</details>

---

<div align="center">

## 🌟 프로젝트 정보

**Made with ❤️ by EditUs Team**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-goormeditus.com-brightgreen?style=flat-square)](https://goormeditus.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/whdxo/web_ide_project)

**관련 링크**
[Judge0 API](https://judge0.com) • [RapidAPI](https://rapidapi.com) • [OpenAI](https://openai.com)

---

**📄 License:** ISC

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!

</div>
