<div align="center">

# 🚀 EditUs

### 팀 협업을 위한 올인원 웹 개발 플랫폼

**코드 작성부터 프로젝트 관리까지, 브라우저에서 바로.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-goormeditus.com-brightgreen?style=for-the-badge)](https://goormeditus.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/whdxo/web_ide_project)

</div>

---

## 📖 프로젝트 소개

**EditUs**는 브라우저 환경에서 코드 작성, 파일 관리, 실시간 협업, 일정 관리까지 가능한 **웹 기반 통합 개발 환경(Web IDE)**입니다.
설치 없이 바로 사용할 수 있는 개발 환경을 제공하여, 어디서든 팀과 함께 프로젝트를 진행할 수 있습니다.

### 개발 기간
**2025.12.01 ~ 2025.12.30** (4주)

### 프로젝트 목표
- 웹 환경에서 동작하는 IDE 핵심 기능 구현
- 팀 단위 협업을 고려한 구조 설계
- 프론트엔드·백엔드·배포까지 전 과정을 경험하는 풀스택 프로젝트 수행
- 실무에 가까운 API 설계, 인증, 파일 구조 관리, 실시간 통신 구현

---

## ✨ 주요 기능

<table>
<tr>
<td width="50%">

### 💻 웹 기반 IDE
- 🌍 **9개 프로그래밍 언어 지원**
  - JavaScript, Python, Java, C++, C, Go, Rust, Ruby, PHP
- ⚡ **실시간 코드 실행**
  - Judge0 API 기반 안전한 샌드박스 환경
- 📝 **Monaco Editor 통합**
  - VS Code와 동일한 편집 경험
  - 문법 하이라이팅 & 자동완성
- 📁 **파일 시스템 관리**
  - 폴더/파일 생성, 수정, 삭제
  - 계층형 트리 구조

</td>
<td width="50%">

### 👥 실시간 협업
- 💬 **팀 채팅**
  - WebSocket 기반 실시간 메시징
  - 채팅 기록 자동 저장
- 📊 **프로젝트 관리**
  - 여러 프로젝트를 한눈에 관리
  - 초대 링크로 팀원 추가
- 🔄 **자동 저장**
  - 코드 작업 중 자동으로 저장
- 👤 **멤버 관리**
  - 역할 기반 권한 제어 (Owner, Editor, User)

</td>
</tr>
<tr>
<td width="50%">

### 📅 일정 관리
- ✅ **투두리스트**
  - 개인 작업 목록 추적
  - 상태별 필터링
- 🎯 **스프린트 보드**
  - 애자일 방식의 작업 관리
  - 담당자 및 기간 설정
- 📌 **태스크 보드**
  - 칸반 스타일 작업 관리
  - ToDo / In Progress / Done

</td>
<td width="50%">

### 🤖 AI 코드 리뷰
- 🔍 **자동 코드 분석**
  - OpenAI API 기반 코드 품질 검토
- 💡 **개선 제안**
  - 코드 요약 및 문제점 파악
  - 최적화 및 베스트 프랙티스 제안
- 📝 **리뷰 기록 관리**
  - 과거 리뷰 내역 조회

</td>
</tr>
<tr>
<td width="50%">

### 🔐 보안 & 인증
- 🔑 **JWT 인증**
  - 안전한 토큰 기반 인증
  - Refresh Token 자동 갱신
- 🎫 **카카오 소셜 로그인**
  - 간편한 OAuth2 인증
- 🛡️ **Spring Security**
  - 엔터프라이즈급 보안

</td>
<td width="50%">

### ⚙️ 프로젝트 설정
- 🔧 **프로젝트 구성**
  - 프로젝트명 및 설명 관리
- 👥 **멤버 초대**
  - 초대 링크 생성 및 공유
  - 초대 만료 시간 설정
- 🚪 **나가기 & 삭제**
  - 프로젝트 나가기 (조건부)
  - 프로젝트 삭제 (Owner만 가능)

</td>
</tr>
</table>

---

## 📸 주요 화면

### 🔐 인증 화면

<table>
<tr>
<td width="33%" align="center">
<img src="화면 캡쳐/로그인.png" alt="로그인" width="100%"/>
<br/><b>로그인 & 회원가입</b>
<br/>이메일 로그인 또는 카카오 소셜 로그인
</td>
<td width="33%" align="center">
<img src="화면 캡쳐/프로젝트 생성.png" alt="프로젝트 생성" width="100%"/>
<br/><b>프로젝트 생성</b>
<br/>새 프로젝트 생성 및 목록 조회
</td>
<td width="33%" align="center">
<img src="화면 캡쳐/프로젝트 초대.png" alt="프로젝트 초대" width="100%"/>
<br/><b>프로젝트 초대</b>
<br/>초대 링크 생성 및 팀원 참여
</td>
</tr>
</table>

### 💻 코드 에디터

<div align="center">
<img src="화면 캡쳐/코드 에디터 화면(코드수행).png" alt="코드 에디터" width="90%"/>
<br/><br/>
<b>Monaco Editor 기반 코드 작성 및 실행</b>
<br/>
파일 트리, 코드 편집기, 터미널을 한눈에 볼 수 있는 통합 인터페이스
</div>

### 📱 사이드 패널 기능

<table>
<tr>
<td width="25%" align="center">
<img src="화면 캡쳐/사이드 멤버목록.png" alt="멤버 목록" height="300"/>
<br/><b>멤버 목록</b>
<br/>프로젝트 참여 멤버 조회
</td>
<td width="25%" align="center">
<img src="화면 캡쳐/사이드 일정관리.png" alt="일정 관리" height="300"/>
<br/><b>일정 관리</b>
<br/>투두리스트 및 스프린트 관리
</td>
<td width="25%" align="center">
<img src="화면 캡쳐/사이드 ai 리뷰.png" alt="AI 리뷰" height="300"/>
<br/><b>AI 코드 리뷰</b>
<br/>AI 기반 코드 분석 및 개선 제안
</td>
<td width="25%" align="center">
<img src="화면 캡쳐/사이드 설정.png" alt="설정" height="300"/>
<br/><b>프로젝트 설정</b>
<br/>프로젝트 정보 및 권한 관리
</td>
</tr>
</table>

---

## 🛠 기술 스택

<table>
<tr>
<td width="50%" valign="top">

### 🎨 Frontend
| 분류 | 기술 스택 |
|------|----------|
| **Framework** | React 19, TypeScript |
| **Build Tool** | Vite 7.2 |
| **Styling** | TailwindCSS v4 |
| **Code Editor** | Monaco Editor |
| **State Management** | Zustand, TanStack Query (React Query) |
| **Routing** | React Router v7 |
| **HTTP Client** | Axios |
| **Real-time** | WebSocket (STOMP, SockJS) |

</td>
<td width="50%" valign="top">

### ⚙️ Backend
| 분류 | 기술 스택 |
|------|----------|
| **Framework** | Spring Boot 3.x |
| **Language** | Java 17 |
| **Build Tool** | Gradle |
| **Database** | MySQL 8.0 |
| **Cache** | Redis |
| **Security** | Spring Security, JWT |
| **Real-time** | Spring WebSocket (STOMP) |
| **Code Execution** | Judge0 API |
| **AI** | OpenAI API |

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🚀 DevOps
| 분류 | 기술 스택 |
|------|----------|
| **Container** | Docker, Docker Compose |
| **CI/CD** | Jenkins |
| **Cloud** | AWS EC2, AWS S3 |
| **Reverse Proxy** | Nginx |

</td>
<td width="50%" valign="top">

### 🤝 협업 도구
| 분류 | 도구 |
|------|------|
| **버전 관리** | Git, GitHub |
| **프로젝트 관리** | Notion |
| **API 문서** | Notion, Swagger (예정) |
| **디자인** | Figma |

</td>
</tr>
</table>

---

## 🏗 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Auth    │  │ Project  │  │  Editor  │  │   Chat   │        │
│  │  Module  │  │  Module  │  │  Module  │  │  Module  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│       │              │              │              │             │
│       └──────────────┴──────────────┴──────────────┘             │
│                         │                                         │
│                    Axios + WebSocket                             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ HTTPS / WSS
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Backend (Spring Boot)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   Auth   │  │ Project  │  │   File   │  │   Chat   │        │
│  │Controller│  │Controller│  │Controller│  │Controller│        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │              │              │              │             │
│  ┌────▼──────────────▼──────────────▼──────────────▼─────┐      │
│  │                  Service Layer                         │      │
│  └────┬──────────────┬──────────────┬──────────────┬─────┘      │
│       │              │              │              │             │
│  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐        │
│  │   JPA    │  │  Redis   │  │ Judge0   │  │ OpenAI   │        │
│  │Repository│  │Pub/Sub   │  │   API    │  │   API    │        │
│  └────┬─────┘  └────┬─────┘  └──────────┘  └──────────┘        │
└───────┼─────────────┼─────────────────────────────────────────┘
        │             │
        │             │
┌───────▼─────┐ ┌────▼─────┐
│    MySQL    │ │   Redis  │
│   Database  │ │  Cache   │
└─────────────┘ └──────────┘
```

---

## 🎯 주요 기능 설명

### 1. 회원 인증 시스템
- **Spring Security + JWT**: 안전한 토큰 기반 인증
- **카카오 OAuth2**: 소셜 로그인 지원
- **Refresh Token**: Redis 기반 토큰 갱신으로 보안 강화
- **자동 로그인**: localStorage를 통한 세션 유지

### 2. 파일 시스템 관리
- **계층형 구조**: MySQL 기반 폴더/파일 트리 구조
- **실시간 동기화**: 파일 생성/수정/삭제 시 즉시 반영
- **자동 저장**: Debounce를 활용한 효율적인 자동 저장
- **언어 감지**: 파일 확장자 기반 자동 언어 인식

### 3. 코드 실행 엔진
- **Judge0 API 연동**: 9개 언어 지원 (JavaScript, Python, Java, C++, C, Go, Rust, Ruby, PHP)
- **샌드박스 실행**: 안전한 격리 환경에서 코드 실행
- **실행 결과 표시**: 표준 출력, 에러, 실행 시간 등 상세 정보 제공

### 4. 실시간 채팅
- **WebSocket STOMP**: 양방향 실시간 통신
- **Redis Pub/Sub**: 메시지 브로드캐스팅 및 확장성 확보
- **채팅 기록**: MySQL에 메시지 저장 및 조회
- **접속자 수**: 실시간 프로젝트 참여 인원 표시

### 5. AI 코드 리뷰
- **OpenAI API**: GPT 모델을 활용한 코드 분석
- **자동 분석**: 코드 요약, 문제점 파악, 개선 제안 제공
- **리뷰 기록**: AI 리뷰 결과 저장 및 히스토리 관리

### 6. 일정 관리 시스템
- **개인 Todo**: 개인별 작업 목록 관리
- **팀 Task**: 칸반 보드 스타일의 협업 작업 관리
- **Sprint**: 애자일 방식의 스프린트 단위 일정 관리
- **상태 관리**: ToDo / In Progress / Done 상태별 필터링

---

## 💻 로컬 개발 환경 설정

### 필수 요구사항
- **Node.js** 18 이상
- **Java** 17 이상
- **Docker** & **Docker Compose**
- **Gradle** 8.x

### 빠른 시작 (Quick Start)

```bash
# 1. 저장소 클론
git clone https://github.com/whdxo/web_ide_project.git
cd web_ide_project

# 2. 환경변수 설정
cp .env.example .env
# .env 파일을 열어서 필수 API 키 입력 (아래 참고)

# 3. 전체 실행 (Docker Compose)
docker-compose up -d
```

**접속 주소**
- 🌐 **Frontend**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:8080
- 🗄️ **MySQL**: localhost:3307
- 🔴 **Redis**: localhost:6379

### 환경변수 설정

`.env` 파일에 다음 키를 추가하세요:

| 키 | 설명 | 필수 여부 | 발급 링크 |
|---|---|:---:|---|
| `DB_ROOT_PASSWORD` | MySQL root 비밀번호 | ✅ | - |
| `DB_NAME` | 데이터베이스 이름 | ✅ | - |
| `DB_USER` | 데이터베이스 사용자 | ✅ | - |
| `DB_PASSWORD` | 데이터베이스 비밀번호 | ✅ | - |
| `JWT_SECRET` | JWT 서명 키 | ✅ | - |
| `JUDGE0_API_KEY` | 코드 실행 엔진 | ✅ | [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce) |
| `OPENAI_API_KEY` | AI 코드 리뷰 | ⚪ | [OpenAI API Keys](https://platform.openai.com/api-keys) |
| `KAKAO_CLIENT_ID` | 카카오 소셜 로그인 | ⚪ | [Kakao Developers](https://developers.kakao.com) |
| `KAKAO_CLIENT_SECRET` | 카카오 소셜 로그인 | ⚪ | [Kakao Developers](https://developers.kakao.com) |

<details>
<summary><b>개별 실행 방법 (고급)</b></summary>

#### MySQL & Redis 실행
```bash
docker-compose up -d mysql redis
```

#### Backend 실행
```bash
cd backend
source ../.env  # 환경변수 로드
./gradlew bootRun
```

#### Frontend 실행
```bash
cd frontend
npm install
npm run dev
```

</details>

---

## 🧪 테스트 결과

<div align="center">

**모든 핵심 기능 테스트 통과 ✅**

</div>

<table>
<tr>
<td width="33%">

**📁 파일 시스템**
- ✅ 파일 생성
- ✅ 폴더 생성
- ✅ 파일 수정
- ✅ 파일 삭제
- ✅ 파일 트리 조회

</td>
<td width="33%">

**⚡ 코드 실행**
- ✅ JavaScript
- ✅ Python
- ✅ Java
- ✅ C++
- ✅ C
- ✅ 에러 처리

</td>
<td width="33%">

**🔍 추가 언어**
- ✅ Go
- ✅ Rust
- ✅ Ruby
- ✅ PHP
- ✅ 실행 시간 측정

</td>
</tr>
<tr>
<td width="33%">

**👥 협업 기능**
- ✅ 실시간 채팅
- ✅ 프로젝트 초대
- ✅ 멤버 관리
- ✅ 권한 제어

</td>
<td width="33%">

**🔐 인증**
- ✅ 이메일 회원가입
- ✅ 로그인/로그아웃
- ✅ 카카오 OAuth2
- ✅ JWT 토큰 갱신

</td>
<td width="33%">

**📅 일정 관리**
- ✅ Todo 생성/수정/삭제
- ✅ Task 보드
- ✅ Sprint 관리
- ✅ 상태별 필터링

</td>
</tr>
</table>

---

## 📡 API 문서

<details>
<summary><b>🔐 인증 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/join` | 회원가입 | ❌ |
| `POST` | `/api/auth/login` | 로그인 | ❌ |
| `POST` | `/api/auth/logout` | 로그아웃 | ✅ |
| `POST` | `/api/auth/refresh` | 토큰 갱신 | ❌ |
| `GET` | `/api/auth/me` | 현재 사용자 정보 조회 | ✅ |

</details>

<details>
<summary><b>📂 프로젝트 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/projects` | 프로젝트 목록 조회 | ✅ |
| `POST` | `/api/projects` | 프로젝트 생성 | ✅ |
| `GET` | `/api/projects/{id}` | 프로젝트 상세 조회 | ✅ |
| `DELETE` | `/api/projects/{id}` | 프로젝트 삭제 (Owner만) | ✅ |
| `POST` | `/api/projects/{id}/invitations` | 초대 링크 생성 | ✅ |
| `POST` | `/api/invitations/{code}/join` | 초대 수락 | ✅ |
| `GET` | `/api/projects/{id}/members` | 멤버 목록 조회 | ✅ |
| `DELETE` | `/api/projects/{id}/members/{userId}` | 멤버 제거 | ✅ |

</details>

<details>
<summary><b>📄 파일 시스템 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/projects/{id}/files` | 파일 트리 조회 | ✅ |
| `POST` | `/api/projects/{id}/files` | 파일 생성 | ✅ |
| `POST` | `/api/projects/{id}/folders` | 폴더 생성 | ✅ |
| `GET` | `/api/files/{id}` | 파일 내용 조회 | ✅ |
| `PUT` | `/api/files/{id}` | 파일 내용 수정 | ✅ |
| `DELETE` | `/api/projects/{id}/files/{fileId}` | 파일 삭제 | ✅ |

</details>

<details>
<summary><b>⚡ 코드 실행 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/code/execute` | 코드 실행 요청 | ✅ |

**Request Body**
```json
{
  "language": "javascript",
  "code": "console.log('Hello World');",
  "input": ""
}
```

**Response**
```json
{
  "output": "Hello World\n",
  "error": null,
  "status": "Accepted",
  "executionTime": "0.017s"
}
```

</details>

<details>
<summary><b>💬 채팅 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/chat/room/{projectId}/messages` | 채팅 기록 조회 | ✅ |
| `WS` | `/ws-chat` | WebSocket 연결 | ✅ |
| `SEND` | `/app/chat/message` | 메시지 전송 (STOMP) | ✅ |
| `SUB` | `/topic/chat/room/{projectId}` | 메시지 구독 (STOMP) | ✅ |

</details>

<details>
<summary><b>🤖 AI 리뷰 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/ai/review` | AI 코드 리뷰 요청 | ✅ |
| `GET` | `/api/ai/reviews/{projectId}` | 리뷰 기록 조회 | ✅ |

</details>

<details>
<summary><b>📅 일정 관리 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/todos` | Todo 목록 조회 | ✅ |
| `POST` | `/api/todos` | Todo 생성 | ✅ |
| `PUT` | `/api/todos/{id}` | Todo 수정 | ✅ |
| `DELETE` | `/api/todos/{id}` | Todo 삭제 | ✅ |

</details>

---

## 🔧 트러블슈팅

<details>
<summary><b>❌ Judge0 API 오류 (403 Forbidden)</b></summary>

**문제:** `403 Forbidden - You are not subscribed to this API`

**해결 방법:**
1. [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce) 페이지 방문
2. 무료 또는 유료 플랜 구독
3. API 키를 `.env` 파일의 `JUDGE0_API_KEY`에 추가
4. Backend 재시작

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

**Docker Compose 사용 시:**
- `.env` 파일이 `docker-compose.yml`과 같은 디렉토리에 있어야 함
- 환경변수가 자동으로 로드됨

</details>

<details>
<summary><b>🗄️ MySQL 연결 오류</b></summary>

```bash
# Docker 컨테이너 확인
docker ps | grep mysql

# MySQL 로그 확인
docker logs editus-mysql

# MySQL 재시작
docker-compose restart mysql

# MySQL이 준비될 때까지 대기 후 Backend 재시작
docker-compose up -d backend
```

</details>

<details>
<summary><b>🔴 Redis 연결 오류</b></summary>

```bash
# Redis 컨테이너 확인
docker ps | grep redis

# Redis 재시작
docker-compose restart redis

# Redis CLI로 연결 테스트
docker exec -it editus-redis redis-cli
> ping
PONG
```

</details>

<details>
<summary><b>⚡ WebSocket 연결 실패</b></summary>

**문제:** 채팅 기능이 작동하지 않음

**해결 방법:**
1. Backend가 정상적으로 실행 중인지 확인
2. CORS 설정 확인 (`application-dev.yml`의 `cors.allowed-origins`)
3. Frontend의 WebSocket URL 확인 (`.env`의 `VITE_WS_URL`)
4. 브라우저 개발자 도구 콘솔에서 WebSocket 연결 오류 확인

</details>

---

## 👥 팀 구성 및 역할

| 이름 | 역할 | 담당 기능 |
|------|------|-----------|
| **팀원 A** | Backend | 인증/인가, JWT, 파일 시스템 API |
| **팀원 B** | Backend | 채팅, WebSocket, 일정 관리 API, AI 리뷰 |
| **팀원 C** | Frontend | 프로젝트 관리, 파일 트리, 에디터 통합 |
| **팀원 D** | Frontend | 채팅 UI, 일정 관리 UI, AI 리뷰 UI |
| **공통** | DevOps | Docker, CI/CD, AWS 배포 |

---

## 📚 프로젝트를 통해 얻은 경험

### 기술적 성장
- **풀스택 개발 경험**: 프론트엔드부터 백엔드, 데이터베이스, 배포까지 전 과정 경험
- **실시간 통신 구현**: WebSocket(STOMP)을 활용한 양방향 통신 시스템 구축
- **보안 강화**: Spring Security와 JWT를 통한 안전한 인증/인가 시스템 구현
- **외부 API 연동**: Judge0, OpenAI API를 활용한 실용적인 기능 통합
- **상태 관리**: Zustand와 TanStack Query를 활용한 효율적인 클라이언트 상태 관리

### 협업 역량
- **Git 브랜치 전략**: Feature 브랜치 전략 및 Pull Request 기반 코드 리뷰
- **API 명세 기반 협업**: 프론트엔드-백엔드 간 명확한 인터페이스 정의
- **Notion 활용**: 회의록, 기획서, API 문서 체계적 관리
- **이슈 관리**: GitHub Issues를 통한 버그 추적 및 기능 요청 관리

### 문제 해결 능력
- **성능 최적화**: Debounce를 활용한 자동 저장 최적화, Redis 캐싱
- **에러 핸들링**: 전역 예외 처리 및 사용자 친화적 에러 메시지 제공
- **확장성 고려**: 도메인 기반 모듈 설계로 기능 추가 용이

---

## 🚀 향후 개선 계획

- [ ] **실시간 협업 편집**: Operational Transformation 또는 CRDT 기반 동시 편집
- [ ] **코드 버전 관리**: Git 통합 및 커밋 기록 관리
- [ ] **디버깅 기능**: Breakpoint 및 단계별 실행
- [ ] **테마 커스터마이징**: 다크/라이트 모드 및 사용자 정의 테마
- [ ] **플러그인 시스템**: 확장 가능한 플러그인 아키텍처
- [ ] **코드 자동 완성 강화**: Language Server Protocol (LSP) 통합
- [ ] **모바일 반응형**: 태블릿 및 모바일 환경 최적화
- [ ] **Docker 통합**: 컨테이너 기반 코드 실행 환경 구축

---

## 📄 라이선스

이 프로젝트는 **ISC** 라이선스를 따릅니다.

---

<div align="center">

## 🌟 프로젝트 정보

**Made with ❤️ by EditUs Team**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-goormeditus.com-brightgreen?style=flat-square)](https://goormeditus.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/whdxo/web_ide_project)

**관련 링크**

[Judge0 API](https://judge0.com) • [RapidAPI](https://rapidapi.com) • [OpenAI](https://openai.com) • [Monaco Editor](https://microsoft.github.io/monaco-editor/)

---

⭐ **이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**

</div>
