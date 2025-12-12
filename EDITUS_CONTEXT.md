# 에디터스 (EditUs) - Web IDE Project Context

## 1. 프로젝트 개요
- **프로젝트명:** EditUs (웹 기반 통합 개발 환경)
- **목표:** 웹 브라우저에서 코드 작성, 실행, 디버깅, 협업이 가능한 IDE 개발
- **현재 단계:** 프론트엔드 초기 세팅 및 인증 UI 구현 완료 (2025-12-10 기준)

## 2. 기술 스택 (Frontend)
- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS (v3)
- **Routing:** React Router v6
- **State Management:** Zustand (예정), React Query (예정)
- **Icons:** lucide-react

## 3. 디자인 시스템 (Tailwind Config)
`tailwind.config.js`에 등록된 커스텀 컬러:
- **Main Background:** `bg-brand-black` (#1F1F1F)
- **Sidebar/Panel:** `bg-brand-navy` (#0E1A28)
- **Primary Action:** `bg-brand-blue` (#3545D6)
- **Hover/Secondary:** `bg-brand-blue-light` (#5363EE)
- **Accent/Highlight:** `bg-brand-lime` (#C2F750)
- **Kakao Yellow:** `bg-kakao` (#FEE500)

## 4. 현재 구현된 기능 (Frontend)
### 위치: `web_ide_project/frontend/src`
1.  **공통 컴포넌트 (`/components/ui`)**
    - `Input.tsx`: 라벨과 에러 메시지가 포함된 입력 필드
    - `Button.tsx`: 크기(sm, md, lg)와 변형(primary, kakao 등) 지원

2.  **페이지 (`/pages/auth`)**
    - `LoginPage.tsx`: 이메일 로그인, 카카오 로그인 버튼, 로그인 유지 체크
    - `SignupPage.tsx`: 회원가입 폼 (이름, 이메일, 비밀번호 확인)
    - `FindPasswordPage.tsx`: 비밀번호 재설정 이메일 전송 UI

3.  **라우팅 (`App.tsx`)**
    - `/login` (기본 진입점)
    - `/signup`
    - `/find-password`
    - `/projects` (플레이스홀더)

## 5. 실행 방법
터미널에서 다음 명령어를 순서대로 실행:
```powershell
# 1. 프로젝트 폴더로 이동
cd "C:\Users\maxic\OneDrive\Desktop\Web IDE\web_ide_project\frontend"

# 2. 개발 서버 실행
npm run dev
```
- 접속 주소: `http://localhost:5173` (또는 5174)

## 6. 폴더 구조 및 설정
- **Root:** `web_ide_project`
- **Frontend:** `web_ide_project/frontend`
- **Backend:** `web_ide_project/backend`
- **Git:** `https://github.com/whdxo/web_ide_project.git` 연결 완료
- **보안:** `.env` 파일은 `.gitignore`에 등록되어 Git 업로드 차단됨

## 7. 다음 작업 예정 (Next Steps)
1.  **Docker 실행:** 백엔드/DB 컨테이너 구동
2.  **API 연동:** Axios 설정 및 로그인/회원가입 실제 API 연결
3.  **프로젝트 목록 페이지:** React Query를 이용한 데이터 조회 구현
