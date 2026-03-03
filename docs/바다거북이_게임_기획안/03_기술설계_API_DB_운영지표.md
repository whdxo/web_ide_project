# 바다거북이 게임 기획안

## 18) Next.js 정보구조/상태 설계안

### 18-1. 라우트 구조 (App Router)
- `/` : 시작 화면(닉네임, 난이도, 카테고리, 모드 선택)
- `/play/[puzzleId]` : 플레이 화면(문제, 질문/응답 로그, 힌트, 정답 시도)
- `/result/[sessionId]` : 결과 화면(정답 성공 시에만 접근 허용)
- `/daily` : 데일리 진입/결과 요약
- `/history` : 최근 플레이 기록(선택)

### 18-2. 서버 라우트 핸들러
- `POST /api/session/start`
  - 입력: `nickname`, `mode`, `difficulty`, `category`, `puzzleId?`
  - 출력: `sessionId`, `puzzleId`, `questionText`, `hintLimit(=3)`
- `POST /api/session/{id}/ask`
  - 입력: `questionText`
  - 출력: `decision(예/아니오/상관없음)`
  - 동작: 내부적으로 `decision_reason` 로깅
- `POST /api/session/{id}/hint`
  - 입력: 없음
  - 출력: `hintText`, `hintUsedCount`, `remainingHints`
- `POST /api/session/{id}/attempt`
  - 입력: `attemptText`
  - 출력: `decision(정답/오답)`, `scoreSnapshot`
- `POST /api/session/{id}/end`
  - 입력: `endType(clear|giveup|leave)`
  - 출력: `ok`

### 18-3. 클라이언트 상태 모델
- `player`
  - `nickname`
  - `mode`
- `gameSession`
  - `sessionId`
  - `puzzleId`
  - `questionText`
  - `hintUsedCount`
  - `attemptCount`
  - `isCleared`
  - `status(playing|cleared|ended)`
- `chatLog[]`
  - `role(user|ai)`
  - `text`
  - `decision?`
  - `createdAt`

### 18-4. 서버 상태(DB) 모델
- `puzzles`
  - `id`, `title`, `question`, `answer`, `explanation`, `difficulty`, `category`
- `sessions`
  - `id`, `nickname`, `mode`, `puzzle_id`, `hint_used_count`, `attempt_count`, `status`, `started_at`, `ended_at`
- `question_logs`
  - `id`, `session_id`, `question_text`, `decision`, `decision_reason`, `created_at`
- `attempt_logs`
  - `id`, `session_id`, `attempt_text`, `keyword_score`, `semantic_score`, `final_score`, `decision`, `created_at`

### 18-5. 접근 제어/가드
- 결과 페이지는 `session.status == cleared`일 때만 접근 허용
- `giveup|leave`로 종료된 세션은 해설 조회 API 반환 금지
- 힌트는 `hint_used_count < 3`일 때만 발급

---


## 19) 구현 착수 체크리스트 (개발팀용)

### 19-1. 환경/기반 세팅
- [ ] Next.js(App Router) 프로젝트 기본 구조 정리
- [ ] DB(PostgreSQL) 연결 및 마이그레이션 파이프라인 구성
- [ ] 공통 로깅 포맷(`sessionId`, `route`, `latency`, `errorCode`) 정의

### 19-2. 코어 기능 우선 구현
- [ ] 세션 시작 API + 플레이 화면 연동
- [ ] 질문 API(예/아니오/상관없음) + decision_reason 로깅
- [ ] 정답 시도 API(점수 계산/임계치 판정) + attempt 로그 저장
- [ ] 힌트 3회 제한 로직 + UI disabled 처리
- [ ] 정답 성공 전 결과 페이지 접근 차단 미들웨어

### 19-3. QA 시나리오
- [ ] 힌트 3회 초과 요청 시 고정 메시지 반환 확인
- [ ] 오답 반복 후에도 해설 비공개 정책 유지 확인
- [ ] 세션 강제 종료(giveup/leave) 시 결과 비노출 확인
- [ ] 임계치 경계값(0.69/0.70/0.78) 판정 일관성 확인
- [ ] 로그 누락 없이 question/attempt 이벤트 적재 확인

### 19-4. 오픈 베타 전 점검
- [ ] 대표 문제 20개 골든셋으로 회귀 테스트
- [ ] 평균 응답 지연/오류율 기준치 측정
- [ ] 민감 표현/스포일러 필터링 샘플 점검
- [ ] 운영 대시보드(정답도달률, 힌트사용률, 중도이탈률) 확인


## 20) API 상세 명세 (v1)

### 20-1. 공통 규약
- Base URL: `/api`
- Content-Type: `application/json; charset=utf-8`
- 인증: MVP에서는 익명 세션 토큰(`x-session-token`) 사용
- 시간 포맷: ISO 8601 (`2026-03-03T12:34:56Z`)

### 20-2. 에러 코드 표준
- `INVALID_REQUEST` : 필수 파라미터 누락/형식 오류
- `SESSION_NOT_FOUND` : 세션 없음 또는 만료
- `PUZZLE_NOT_FOUND` : 문제 없음
- `HINT_LIMIT_EXCEEDED` : 힌트 3회 초과
- `RESULT_FORBIDDEN` : 정답 성공 전 결과/해설 접근
- `INTERNAL_ERROR` : 서버 내부 오류

### 20-3. 세션 시작
`POST /api/session/start`

Request
```json
{
  "nickname": "player1",
  "mode": "classic",
  "difficulty": "normal",
  "category": "daily-life",
  "puzzleId": "optional-id"
}
```

Response 200
```json
{
  "sessionId": "ses_123",
  "sessionToken": "st_abc",
  "puzzle": {
    "id": "pz_001",
    "title": "...",
    "question": "..."
  },
  "hintLimit": 3,
  "hintUsedCount": 0,
  "attemptCount": 0,
  "status": "playing"
}
```

### 20-4. 질문
`POST /api/session/{sessionId}/ask`

Request
```json
{
  "questionText": "그 사람은 사고로 죽었나요?"
}
```

Response 200
```json
{
  "decision": "예",
  "createdAt": "2026-03-03T12:34:56Z"
}
```

### 20-5. 힌트 요청
`POST /api/session/{sessionId}/hint`

Response 200
```json
{
  "hintText": "사건 발생 직전의 행동을 주목하세요.",
  "hintUsedCount": 1,
  "remainingHints": 2
}
```

Response 409
```json
{
  "code": "HINT_LIMIT_EXCEEDED",
  "message": "힌트는 최대 3회까지 사용할 수 있습니다."
}
```

### 20-6. 정답 시도
`POST /api/session/{sessionId}/attempt`

Request
```json
{
  "attemptText": "남자는 독이 든 물을 마셨고, 그 사실을 몰랐다."
}
```

Response 200 (오답)
```json
{
  "decision": "오답",
  "attemptCount": 3,
  "scoreSnapshot": {
    "keywordScore": 0.62,
    "semanticScore": 0.66,
    "finalScore": 0.63
  }
}
```

Response 200 (정답)
```json
{
  "decision": "정답",
  "attemptCount": 4,
  "sessionStatus": "cleared",
  "resultUrl": "/result/ses_123"
}
```

### 20-7. 결과 조회
`GET /api/session/{sessionId}/result`

Response 200 (정답 성공 세션만)
```json
{
  "sessionId": "ses_123",
  "puzzleId": "pz_001",
  "answer": "...",
  "explanation": "...",
  "stats": {
    "questionCount": 18,
    "attemptCount": 4,
    "hintUsedCount": 2
  }
}
```

Response 403
```json
{
  "code": "RESULT_FORBIDDEN",
  "message": "정답 성공 세션만 결과를 조회할 수 있습니다."
}
```

---


## 21) DB 스키마 초안 (PostgreSQL)

### 21-1. sessions
- `id` (PK, text)
- `session_token` (unique, text)
- `nickname` (text)
- `mode` (text)
- `puzzle_id` (FK)
- `hint_used_count` (int, default 0)
- `attempt_count` (int, default 0)
- `status` (text: `playing|cleared|ended`)
- `started_at` (timestamptz)
- `ended_at` (timestamptz, nullable)

### 21-2. question_logs
- `id` (PK)
- `session_id` (FK)
- `question_text` (text)
- `decision` (text)
- `decision_reason` (text, 플레이어 비노출)
- `created_at` (timestamptz)

### 21-3. attempt_logs
- `id` (PK)
- `session_id` (FK)
- `attempt_text` (text)
- `keyword_score` (numeric(4,3))
- `semantic_score` (numeric(4,3))
- `final_score` (numeric(4,3))
- `decision` (text: `정답|오답`)
- `created_at` (timestamptz)

### 21-4. puzzles
- `id` (PK)
- `title` (text)
- `question` (text)
- `answer` (text)
- `explanation` (text)
- `difficulty` (text)
- `category` (text)
- `allowed_keywords` (jsonb)
- `required_entities` (jsonb)
- `hint_1`, `hint_2`, `hint_3` (text)
- `is_active` (boolean)

---


## 22) 운영 대시보드 지표 정의 (v1)

### 22-1. 퍼널
- 시작 세션 수
- 첫 질문 도달률
- 첫 정답 시도 도달률
- 정답 성공률
- 중도 이탈률

### 22-2. 품질 지표
- 평균 질문 수(정답 성공/실패 분리)
- 평균 정답 시도 횟수
- 힌트 사용 분포(0~3)
- 판정 재확인 구간 비율(0.70~0.78)
- 결과 조회 성공/차단 비율

### 22-3. AI 응답 안정성 지표
- decision 불일치율(동일 질문 유사군)
- 스포일러 의심 응답률(운영 샘플링)
- `decision_reason` 로그 누락률
- 평균 응답 지연(ms)

### 22-4. 알림 기준(초안)
- 5분 이동 평균 오류율 > 3% → 경고
- API p95 지연 > 2000ms → 경고
- 결과 차단 실패(비정상 200 응답) 1건 이상 → 즉시 알림

## 22-5) API 거버넌스 보강 (시니어 피드백 반영)
- 버저닝: `/api/v1/...` 경로 체계를 적용하고 하위호환 원칙을 유지한다.
- 멱등성: `POST /session/start`, `POST /session/{id}/attempt`는 `Idempotency-Key` 헤더를 지원한다.
- 타임아웃/재시도: 외부 AI 호출 실패 시 지수 백오프(최대 2회) 후 표준 에러를 반환한다.
- 추적성: 모든 응답 헤더에 `x-request-id`를 포함한다.

## 22-6) 데이터 거버넌스 보강 (시니어 피드백 반영)
- 보존기간: `question_logs`, `attempt_logs`는 기본 90일 보관 후 집계 데이터만 유지
- 개인정보 최소화: 닉네임 외 개인식별 정보 저장 금지
- 삭제정책: 세션 삭제 요청 시 24시간 내 논리삭제 처리
- 감사필드: 주요 테이블에 `created_by`, `updated_by`, `updated_at` 감사 필드 적용 권장
