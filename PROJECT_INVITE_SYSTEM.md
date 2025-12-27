# 프로젝트 초대 및 멤버 관리 시스템 설계 (네이버 밴드 방식)

## 1. 개요
사용자가 프로젝트를 생성하면 '리더(Owner)'가 됩니다. 리더는 프로젝트 설정을 통해 **초대 코드(Invite Code)**를 생성할 수 있으며, 다른 사용자는 이 코드를 입력하여 프로젝트 멤버로 참여할 수 있습니다.

## 2. 사용자 시나리오 (User Flow)

### A. 프로젝트 생성 및 초대 (리더)
1. 사용자가 '새 프로젝트 생성' 버튼을 클릭하여 프로젝트를 만듭니다.
2. 프로젝트 내부의 '설정' 또는 '멤버 관리' 메뉴로 진입합니다.
3. **"초대 코드 생성"** 버튼을 누릅니다.
4. 6~8자리의 랜덤한 초대 코드(예: `A1B2-C3D4`)가 생성됩니다. (유효기간 설정 가능, 예: 24시간)
5. 리더는 이 코드를 복사하여 팀원들에게 메신저 등으로 공유합니다.

### B. 프로젝트 참여 (팀원)
1. 로그인 후 메인 페이지(프로젝트 목록)에서 **"초대 코드로 참여하기"** 버튼을 누릅니다.
2. 입력 모달창이 뜨면 전달받은 초대 코드를 입력합니다.
3. 코드가 유효하면 해당 프로젝트의 멤버로 즉시 추가됩니다.
4. 프로젝트 목록에 해당 프로젝트가 나타나고 접근할 수 있게 됩니다.

---

## 3. 데이터베이스 모델링 (ERD)

### Project (기존 테이블 확장)
- `project_id` (PK)
- `name`
- `owner_id` (FK -> User)
- `invite_code` (String, Unique, Nullable) : 현재 유효한 초대 코드
- `invite_code_expires_at` (DateTime) : 초대 코드 만료 시간

### ProjectMember (신규 테이블 - 다대다 관계 해소)
- `id` (PK)
- `project_id` (FK)
- `user_id` (FK)
- `role` (Enum: OWNER, MEMBER) : 권한 관리 (리더/일반)
- `joined_at` (DateTime)

---

## 4. API 명세 (Backend)

### A. 초대 코드 관리
- **POST** `/api/projects/{projectId}/invite-code`
    - 기능: 새로운 초대 코드 생성 (기존 코드가 있다면 갱신)
    - 응답: `{ "inviteCode": "X7Z9-Q2W1", "expiresAt": "2025-12-24T10:00:00" }`

- **GET** `/api/projects/{projectId}/invite-code`
    - 기능: 현재 유효한 초대 코드 조회
    - 응답: `{ "inviteCode": "...", "expiresAt": "..." }`

### B. 프로젝트 참여
- **POST** `/api/projects/join`
    - 요청: `{ "inviteCode": "X7Z9-Q2W1" }`
    - 기능: 초대 코드를 검증하고, 유효하면 현재 로그인한 유저를 멤버로 추가
    - 응답: `{ "projectId": 1, "name": "Team Project A", "status": "joined" }`

### C. 멤버 목록 조회
- **GET** `/api/projects/{projectId}/members`
    - 기능: 프로젝트에 소속된 멤버 목록 조회
    - 응답: `[ { "userId": 1, "name": "Kim", "role": "OWNER" }, ... ]`

---

## 5. 프론트엔드 구현 사항

### A. 프로젝트 목록 페이지 (`ProjectSelectionPage`)
- [ ] "새 프로젝트 생성" 버튼 옆에 **"초대 코드로 입장"** 버튼 추가
- [ ] 초대 코드 입력 모달 (`InviteCodeModal`) 구현
- [ ] API 연동: `POST /api/projects/join`

### B. 프로젝트 설정 페이지 (`SettingPage`)
- [ ] **"멤버 관리"** 탭 추가
- [ ] 현재 멤버 리스트 표시
- [ ] **"초대 코드 생성/복사"** UI 구현
- [ ] API 연동: `POST /api/projects/{id}/invite-code`

---

## 6. 보안 및 예외 처리
- 이미 참여한 프로젝트에 다시 코드를 입력하면? -> "이미 참여 중인 프로젝트입니다." 메시지
- 만료된 코드를 입력하면? -> "유효하지 않거나 만료된 코드입니다." 메시지
- 존재하지 않는 코드를 입력하면? -> "잘못된 초대 코드입니다." 메시지
