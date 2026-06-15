<div align="center">

# 🚀 EditUs

### 팀 협업을 위한 올인원 웹 개발 플랫폼

**코드 작성부터 프로젝트 관리까지, 브라우저에서 바로.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-goormeditus.com-brightgreen?style=for-the-badge)](https://goormeditus.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/whdxo/web_ide_project)

</div>

---

## 📖 프로젝트 소개

**EditUs**는 브라우저 환경에서 코드 작성, 파일 관리, 팀 채팅, 일정 관리 기능을 제공하는 **웹 기반 통합 개발 환경(Web IDE)**입니다.
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
- ⚡ **코드 실행**
  - Judge0 API 기반 안전한 샌드박스 환경
- 📝 **Monaco Editor 통합**
  - VS Code 기반 편집 인터페이스
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
  - 프로젝트 소유자와 일반 멤버 구분
  - 소유자 전용 초대, 멤버 삭제, 프로젝트 삭제

</td>
</tr>
<tr>
<td width="50%">

### 📅 일정 관리
- ✅ **투두리스트**
  - 개인 작업 목록 추적
  - 상태별 필터링
- 🧪 **Task/Sprint 프로토타입**
  - 프론트엔드 화면 및 상태 관리 구조 구성
  - 백엔드 CRUD와 사용자 인증 연동은 향후 과제

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
  - Access Token 기반 사용자 식별
  - Redis 기반 Refresh Token 저장 및 재발급 API
- 🎫 **카카오 소셜 로그인**
  - 간편한 OAuth2 인증
- 🛡️ **Spring Security**
  - JWT 필터와 OAuth2 로그인 구성
  - 현재 개발 설정은 일부 API 접근 정책 보완 필요

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
<br/>투두리스트와 Task/Sprint 프로토타입
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
| **Real-time** | WebSocket (STOMP) |

</td>
<td width="50%" valign="top">

### ⚙️ Backend
| 분류 | 기술 스택 |
|------|----------|
| **Framework** | Spring Boot 4.0 |
| **Language** | Java 17 |
| **Build Tool** | Gradle |
| **Database** | MySQL 8.0 |
| **Redis** | Pub/Sub, Refresh Token 저장 |
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
| **CI/CD 환경** | Jenkins 컨테이너 구성 |
| **Cloud 연동** | AWS S3 Presigned URL |

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
│   Database  │ │Pub/Sub & │
│             │ │  Token   │
└─────────────┘ └──────────┘
```

---

## 🎯 주요 기능 설명

### 1. 회원 인증 시스템
- **Spring Security + JWT**: Access Token 검증 및 사용자 식별
- **카카오 OAuth2**: 소셜 로그인 지원
- **Refresh Token**: Redis 저장, TTL 기반 만료 및 토큰 재발급 API
- **세션 복원**: Zustand persist와 localStorage를 통한 로그인 상태 유지
- **현재 제한사항**: 401 응답 시 Refresh Token을 이용한 자동 재발급은 미구현
- **현재 제한사항**: 개발 설정의 전역 API 접근 정책은 운영 전 인증 필수 정책으로 전환 필요

### 2. 파일 시스템 관리
- **계층형 구조**: MySQL 기반 폴더/파일 트리 구조
- **화면 상태 갱신**: 파일 생성/수정/삭제 API 응답을 파일 트리에 반영
- **자동 저장**: 일정 주기로 활성 파일의 변경 내용을 저장
- **언어 감지**: 파일 확장자 기반 자동 언어 인식

### 3. 코드 실행 엔진
- **Judge0 API 연동**: 9개 언어 지원 (JavaScript, Python, Java, C++, C, Go, Rust, Ruby, PHP)
- **샌드박스 실행**: 안전한 격리 환경에서 코드 실행
- **실행 결과 표시**: 표준 출력, 에러, 실행 시간 등 상세 정보 제공

### 4. 실시간 채팅
- **WebSocket STOMP**: 양방향 실시간 통신
- **Redis Pub/Sub**: 서버에서 수신한 메시지를 채팅방 구독자에게 브로드캐스트
- **채팅 기록**: MySQL에 메시지 저장 및 조회
- **접속자 수**: 실시간 프로젝트 참여 인원 표시
- **현재 제한사항**: 채팅방 구독·전송 시 프로젝트 멤버 권한 검증 보완 필요

### 5. AI 코드 리뷰
- **OpenAI API**: GPT 모델을 활용한 코드 분석
- **자동 분석**: 코드 요약, 문제점 파악, 개선 제안 제공
- **리뷰 기록**: AI 리뷰 결과 저장 및 히스토리 관리

### 6. 일정 관리 시스템
- **Todo CRUD**: 생성, 조회, 수정, 완료 토글, 삭제 API 구현
- **현재 제한사항**: Todo 사용자 ID가 임시 값으로 고정되어 있어 JWT 사용자 연동 필요
- **Task/Sprint**: 프론트엔드 프로토타입 단계이며 백엔드 기능은 미완성

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

## 🧪 검증 현황

현재 저장소에는 자동화 테스트 코드가 포함되어 있지 않습니다. 아래 항목은 프로젝트 문서와 구현 코드를 기준으로 정리한 기능 범위이며, 운영 수준의 품질을 보장하는 테스트 결과를 의미하지 않습니다.

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
- ✅ STOMP 기반 채팅 송수신
- ✅ 프로젝트 초대 및 멤버 관리
- ⚠️ 소유자 전용 기능 권한 검증
- ⚠️ 채팅방 멤버 권한 검증 필요

</td>
<td width="33%">

**🔐 인증**
- ✅ 이메일 회원가입
- ✅ 로그인/로그아웃
- ✅ 카카오 OAuth2
- ✅ Refresh Token 저장 및 재발급 API
- ⚠️ 401 응답 시 자동 토큰 재발급 미구현
- ⚠️ 운영용 API 인증 정책 전환 필요

</td>
<td width="33%">

**📅 일정 관리**
- ✅ Todo 생성/수정/삭제
- ✅ Todo 완료 상태 변경 및 필터링
- 🧪 Task/Sprint UI 프로토타입
- ⚠️ Todo JWT 사용자 연동 필요

</td>
</tr>
</table>

---

## 📡 API 문서

> 아래 인증 표시는 클라이언트에서 JWT를 사용하는 의도된 흐름을 기준으로 합니다. 현재 `SecurityConfig`는 개발 편의를 위해 다수 경로를 `permitAll`로 허용하므로 운영 전 접근 정책 보완이 필요합니다.

<details>
<summary><b>🔐 인증 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/join` | 회원가입 | ❌ |
| `POST` | `/api/auth/login` | 로그인 | ❌ |
| `POST` | `/api/auth/logout` | 로그아웃 | ✅ |
| `POST` | `/api/auth/refresh` | 토큰 갱신 | ❌ |
| `GET` | `/api/users/me` | 현재 사용자 정보 조회 | ✅ |

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
| `GET` | `/api/projects/{id}/tree` | 파일 트리 조회 | ❌ (현재 설정) |
| `POST` | `/api/projects/{id}/files` | 파일 생성 | ❌ (현재 설정) |
| `POST` | `/api/projects/{id}/folders` | 폴더 생성 | ❌ (현재 설정) |
| `GET` | `/api/files/{id}` | 파일 메타데이터 조회 | ❌ (현재 설정) |
| `POST` | `/api/files/{id}/upload-url` | S3 업로드 URL 발급 | ❌ (현재 설정) |
| `GET` | `/api/files/{id}/content-url` | S3 다운로드 URL 발급 | ❌ (현재 설정) |
| `DELETE` | `/api/projects/{id}/files/{fileId}` | 파일 삭제 | ❌ (현재 설정) |
| `DELETE` | `/api/projects/{id}/folders/{folderId}` | 폴더 삭제 | ❌ (현재 설정) |

</details>

<details>
<summary><b>⚡ 코드 실행 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/code/execute` | 코드 실행 요청 | ❌ (현재 설정) |

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
  "success": true,
  "data": {
    "output": "Hello World\n",
    "error": null,
    "exitCode": 0,
    "status": "Accepted",
    "time": 0.017
  }
}
```

</details>

<details>
<summary><b>💬 채팅 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/chat/room/{projectId}/messages` | 채팅 기록 조회 | ❌ (현재 설정) |
| `WS` | `/ws-chat` | WebSocket 연결 | ❌ |
| `SEND` | `/app/chat/message` | 메시지 전송 (STOMP) | JWT 사용 |
| `SUB` | `/topic/chat/room/{projectId}` | 메시지 구독 (STOMP) | ❌ (권한 검증 필요) |

</details>

<details>
<summary><b>🤖 AI 리뷰 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/ai/review` | AI 코드 리뷰 요청 | ❌ (현재 설정) |
| `GET` | `/api/ai/review/history?filePath={path}` | 파일별 리뷰 이력 조회 | ❌ (현재 설정) |
| `GET` | `/api/ai/review/{id}` | 리뷰 상세 조회 | ❌ (현재 설정) |

</details>

<details>
<summary><b>📅 일정 관리 API</b></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/todos` | Todo 목록 조회 | ❌ (임시 사용자 ID) |
| `POST` | `/api/todos` | Todo 생성 | ❌ (임시 사용자 ID) |
| `PUT` | `/api/todos/{id}` | Todo 수정 | ❌ (임시 사용자 ID) |
| `PATCH` | `/api/todos/{id}/toggle` | Todo 완료 상태 변경 | ❌ (임시 사용자 ID) |
| `DELETE` | `/api/todos/{id}` | Todo 삭제 | ❌ (임시 사용자 ID) |

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

**문제:** 배포 환경에서 STOMP 연결 후 인증된 채팅 메시지를 처리하지 못함

**원인:**
1. STOMP 연결 프레임에서 JWT가 전달되지 않으면 서버에 `Principal`이 설정되지 않음
2. 운영 프론트엔드 도메인과 WebSocket URL 설정이 로컬 환경과 달라 연결에 실패할 수 있음

**해결:**
1. Frontend의 STOMP `connectHeaders`와 메시지 전송 헤더에 Bearer Token 추가
2. Backend `ChannelInterceptor`에서 STOMP native `Authorization` 헤더의 JWT 검증
3. 검증된 이메일로 `Principal`을 생성해 메시지 저장 시 사용자 ID 조회
4. 운영 도메인을 CORS 허용 목록에 추가하고 `VITE_WS_URL`을 배포 주소로 설정

**결과:** 인증된 사용자의 프로젝트별 채팅 송수신 및 메시지 저장 흐름을 연결함

> 현재 채팅방 단위의 프로젝트 멤버 권한 검증은 추가 구현이 필요합니다.

</details>

---

## 👥 팀 구성 및 역할

| 이름 | 역할 | 담당 기능 |
|------|------|-----------|
| **팀원 A** | Backend | 인증/인가, JWT, 파일 시스템 API |
| **팀원 B** | Backend | 채팅, WebSocket |
| **팀원 C** | Frontend | 프로젝트 관리, 파일 트리, 에디터 통합 |
| **팀원 D** | Frontend | 채팅 UI, 일정 관리 UI, AI 리뷰 UI |
| **공통** | DevOps | Docker 기반 개발·배포 환경 구성 |

---

## 📚 프로젝트를 통해 얻은 경험

### 기술적 성장
- **풀스택 통합 경험**: 프론트엔드, 백엔드, 데이터베이스 실행 환경을 연결하고 기능 흐름 검증
- **실시간 통신 구현**: WebSocket(STOMP)을 활용한 양방향 통신 시스템 구축
- **인증 흐름 구현**: Spring Security JWT 필터와 STOMP 헤더 인증 처리
- **외부 API 연동**: Judge0, OpenAI API를 활용한 실용적인 기능 통합
- **상태 관리**: Zustand와 TanStack Query를 활용한 효율적인 클라이언트 상태 관리

### 협업 역량
- **Git 브랜치 전략**: Feature 브랜치 전략 및 Pull Request 기반 코드 리뷰
- **API 명세 기반 협업**: 프론트엔드-백엔드 간 명확한 인터페이스 정의
- **Notion 활용**: 회의록, 기획서, API 문서 체계적 관리
- **이슈 관리**: GitHub Issues를 통한 버그 추적 및 기능 요청 관리

### 문제 해결 능력
- **자동 저장**: 활성 파일을 일정 주기로 저장하는 흐름 구성
- **메시지 전달 구조**: Redis Pub/Sub을 통한 채팅 메시지 브로드캐스트
- **에러 핸들링**: 전역 예외 처리 및 사용자 친화적 에러 메시지 제공
- **확장성 고려**: 도메인 기반 모듈 설계로 기능 추가 용이

---

## 🚀 향후 개선 계획

- [ ] **실시간 협업 편집**: Operational Transformation 또는 CRDT 기반 동시 편집
- [ ] **채팅 권한 강화**: STOMP 구독 및 메시지 전송 시 프로젝트 멤버 검증
- [ ] **운영 보안 정책**: 개발용 `permitAll` 제거 및 API별 인증·인가 정책 적용
- [ ] **일정 기능 완성**: Todo 사용자 인증 연동 및 Task/Sprint 백엔드 구현
- [ ] **자동화 테스트**: 인증, 권한, 채팅, 프로젝트 API 통합 테스트 추가
- [ ] **코드 버전 관리**: Git 통합 및 커밋 기록 관리
- [ ] **디버깅 기능**: Breakpoint 및 단계별 실행
- [ ] **테마 커스터마이징**: 다크/라이트 모드 및 사용자 정의 테마
- [ ] **플러그인 시스템**: 확장 가능한 플러그인 아키텍처
- [ ] **코드 자동 완성 강화**: Language Server Protocol (LSP) 통합
- [ ] **모바일 반응형**: 태블릿 및 모바일 환경 최적화
- [ ] **자체 코드 실행 환경**: 외부 Judge0 API 의존도를 낮출 격리 실행 환경 검토

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
