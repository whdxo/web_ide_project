# 프로젝트 구조 및 기술 스택 정리

## 1. 프로젝트 파일 구조 (File Structure)

```
web_ide_project/
├── docker-compose.yml          # Docker 컨테이너 오케스트레이션 설정
├── package.json                # 프로젝트 루트 설정
├── EDITUS_CONTEXT.md           # 프로젝트 컨텍스트 문서
│
├── backend/                    # 백엔드 (Spring Boot)
│   ├── build.gradle            # Gradle 빌드 설정 (의존성 관리)
│   ├── Dockerfile              # 백엔드 Docker 이미지 빌드 설정
│   ├── gradlew / gradlew.bat   # Gradle Wrapper 실행 스크립트
│   ├── settings.gradle         # Gradle 프로젝트 설정
│   └── src/main/java/com/editus/backend/
│       ├── EditUsApplication.java  # 메인 애플리케이션 진입점
│       ├── domain/                 # 도메인별 기능 모듈
│       │   ├── ai/                 # AI 관련 기능
│       │   ├── auth/               # 인증/인가 (로그인, 회원가입)
│       │   ├── chat/               # 채팅 기능
│       │   ├── file/               # 파일 관리 기능
│       │   ├── project/            # 프로젝트 관리 기능
│       │   └── schedule/           # 일정 관리 기능
│       └── global/                 # 전역 공통 설정
│           ├── audit/              # JPA Auditing (BaseTimeEntity 등)
│           ├── common/             # 공통 DTO, Utils
│           ├── config/             # 설정 클래스 (Security, WebSocket 등)
│           └── security/           # 보안 관련 설정
│
└── frontend/                   # 프론트엔드 (React + Vite)
    ├── .env
    ├── .env.development
    ├── .env.production
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.cjs
    ├── README.md
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── 프론트_실행_테스트.md
    └── src/
        ├── App.css
        ├── App.tsx
        ├── main.tsx
        ├── vite-env.d.ts
        ├── config/
        │   ├── env.ts
        │   └── routes.ts
        ├── features/
        │   ├── ai/
        │   │   ├── api/
        │   │   │   └── aiApi.ts
        │   │   ├── components/
        │   │   │   ├── AIReviewPanel.tsx
        │   │   │   └── ReviewResult.tsx
        │   │   ├── hooks/
        │   │   │   └── useAIReview.ts
        │   │   ├── store/
        │   │   │   └── aiStore.ts
        │   │   └── types/
        │   │       └── ai.types.ts
        │   ├── auth/
        │   │   ├── api/
        │   │   │   └── authApi.ts
        │   │   ├── components/
        │   │   │   ├── KakaoLoginButton.tsx
        │   │   │   ├── LoginForm.tsx
        │   │   │   └── SignupForm.tsx
        │   │   ├── hooks/
        │   │   │   ├── useAuth.ts
        │   │   │   ├── useLogin.ts
        │   │   │   └── useSignup.ts
        │   │   ├── store/
        │   │   │   └── authStore.ts
        │   │   └── types/
        │   │       └── auth.types.ts
        │   ├── chat/
        │   │   ├── api/
        │   │   │   └── chatApi.ts
        │   │   ├── components/
        │   │   │   ├── ChatPanel.tsx
        │   │   │   ├── MessageInput.tsx
        │   │   │   ├── MessageList.tsx
        │   │   │   └── UserList.tsx
        │   │   ├── hooks/
        │   │   │   ├── useChat.ts
        │   │   │   └── useWebSocket.ts
        │   │   ├── store/
        │   │   │   └── chatStore.ts
        │   │   └── types/
        │   │       └── chat.types.ts
        │   ├── editor/
        │   │   ├── api/
        │   │   │   └── editorApi.ts
        │   │   ├── components/
        │   │   │   ├── EditorPage.tsx
        │   │   │   ├── EditorTabs.tsx
        │   │   │   ├── EditorToolbar.tsx
        │   │   │   └── MonacoEditor.tsx
        │   │   ├── hooks/
        │   │   │   ├── useAutoSave.ts
        │   │   │   ├── useEditor.ts
        │   │   │   └── useFileContent.ts
        │   │   ├── store/
        │   │   │   └── editorStore.ts
        │   │   └── types/
        │   │       └── editor.types.ts
        │   ├── fileTree/
        │   │   ├── api/
        │   │   │   └── fileApi.ts
        │   │   ├── components/
        │   │   │   ├── ContextMenu.tsx
        │   │   │   ├── CreateModal.tsx
        │   │   │   ├── FileNode.tsx
        │   │   │   └── FileTree.tsx
        │   │   ├── hooks/
        │   │   │   ├── useFileOperations.ts
        │   │   │   └── useFileTree.ts
        │   │   ├── store/
        │   │   │   └── fileTreeStore.ts
        │   │   └── types/
        │   │       └── file.types.ts
        │   ├── project/
        │   │   ├── api/
        │   │   │   └── projectApi.ts
        │   │   ├── components/
        │   │   │   ├── ProjectCard.tsx
        │   │   │   ├── ProjectList.tsx
        │   │   │   ├── ProjectSelectionPage.tsx
        │   │   │   └── ProjectSelector.tsx
        │   │   ├── hooks/
        │   │   │   ├── useProjects.ts
        │   │   │   └── useProjectSelection.ts
        │   │   ├── store/
        │   │   │   └── projectStore.ts
        │   │   └── types/
        │   │       └── project.types.ts
        │   └── schedule/
        │       ├── api/
        │       │   └── scheduleApi.ts
        │       ├── components/
        │       │   ├── SprintView.tsx
        │       │   ├── TaskBoard.tsx
        │       │   └── TodoList.tsx
        │       ├── hooks/
        │       │   ├── useSprint.ts
        │       │   ├── useTask.ts
        │       │   └── useTodo.ts
        │       ├── store/
        │       │   └── scheduleStore.ts
        │       └── types/
        │           └── schedule.types.ts
        ├── shared/
        │   ├── components/
        │   │   ├── Layout/
        │   │   │   ├── Header.tsx
        │   │   │   ├── MainLayout.tsx
        │   │   │   └── Sidebar.tsx
        │   │   ├── Button.tsx
        │   │   ├── Input.tsx
        │   │   ├── Loading.tsx
        │   │   └── Modal.tsx
        │   ├── hooks/
        │   │   ├── useDebounce.ts
        │   │   ├── useLocalStorage.ts
        │   │   └── useTheme.ts
        │   ├── types/
        │   │   ├── api.types.ts
        │   │   └── common.types.ts
        │   └── utils/
        │       ├── api.ts
        │       └── constants.ts
        └── styles/
            ├── globals.css
            └── index.css
```

## 2. 사용된 기술 및 스택 (Tech Stack)

### Frontend (프론트엔드)
*   **Core Framework**: React 19
*   **Language**: TypeScript (정적 타입 시스템)
*   **Build Tool**: Vite (빠른 개발 서버 및 빌드 도구)
*   **Styling**: Tailwind CSS v4 (유틸리티 퍼스트 CSS 프레임워크), `clsx`, `tailwind-merge`
*   **Routing**: React Router DOM v7 (SPA 라우팅)
*   **State Management**: Zustand (경량 상태 관리 라이브러리)
*   **Data Fetching**: TanStack Query (React Query) v5 (서버 상태 관리 및 캐싱)
*   **Code Editor**: Monaco Editor (`@monaco-editor/react`) - VS Code 기반 웹 에디터
*   **HTTP Client**: Axios
*   **Real-time**: WebSocket (SockJS, StompJS) - 채팅 및 동시 편집용
*   **Icons**: Lucide React, React Icons

### Backend (백엔드)
*   **Framework**: Spring Boot (Java 기반 웹 프레임워크)
*   **Language**: Java 17
*   **Build Tool**: Gradle
*   **Database Access**: Spring Data JPA (ORM), MySQL Driver
*   **Security**: Spring Security (인증/인가)
*   **Real-time**: Spring WebSocket
*   **Utilities**: Lombok (보일러플레이트 코드 감소)

### Infrastructure & DevOps
*   **Containerization**: Docker, Docker Compose
*   **Database**: MySQL (예상)

## 3. 주요 아키텍처 및 패턴 (Key Concepts)

1.  **Feature-based Folder Structure (기능 기반 폴더 구조)**
    *   프론트엔드 코드를 `pages` 단위가 아닌 `features`(기능) 단위로 모듈화하여 관리합니다.
    *   각 기능 폴더(`auth`, `project`, `editor` 등) 내부에 `components`, `api`, `store`, `types`를 두어 응집도를 높입니다.

2.  **Component Composition (컴포넌트 합성)**
    *   `Layout` 컴포넌트(`Sidebar`, `Header`)와 페이지 컴포넌트를 조합하여 UI를 구성합니다.
    *   `ProjectCard`와 같은 재사용 가능한 UI 컴포넌트를 활용합니다.

3.  **Client-Side Routing (클라이언트 사이드 라우팅)**
    *   `react-router-dom`을 사용하여 페이지 새로고침 없이 URL에 따라 컴포넌트를 전환합니다.
    *   `App.tsx`에서 라우트 정의를 관리합니다.

4.  **State Management (상태 관리)**
    *   **Local State**: `useState` (컴포넌트 내부 상태)
    *   **Global State**: `Zustand` (로그인 정보 등 전역 상태)
    *   **Server State**: `TanStack Query` (API 데이터 캐싱 및 동기화)
