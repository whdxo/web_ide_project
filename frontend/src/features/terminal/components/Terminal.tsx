import { useEffect, useRef } from "react";
import { useTerminalStore } from "../store/terminalStore";
import { VscClearAll } from "react-icons/vsc";

export function Terminal() {
  const { lines, clear } = useTerminalStore();
  const outputRef = useRef<HTMLDivElement>(null);

  // 새 출력이 추가되면 자동 스크롤
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="h-full bg-[#181818] text-gray-300 font-mono text-xs flex flex-col">
      {/* 헤더 */}
      <div className="h-8 flex items-center justify-between border-b border-gray-800 px-3">
        <span className="text-xs text-gray-500 font-semibold">Terminal</span>
        
        {lines.length > 0 && (
          <button
            onClick={clear}
            className="p-1 rounded hover:bg-gray-700 text-gray-500 hover:text-gray-300"
            title="출력 지우기"
          >
            <VscClearAll size={14} />
          </button>
        )}
      </div>

      {/* 출력 영역 */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 space-y-1"
      >
        {lines.length === 0 ? (
          <div className="text-gray-600 text-center mt-8">
            코드를 실행하면 결과가 여기에 표시됩니다
          </div>
        ) : (
          lines.map((line) => (
            <div key={line.id} className="flex gap-2">
              <span className="text-gray-600 text-[10px] flex-shrink-0">
                {line.timestamp}
              </span>
              <span
                className={
                  line.type === "error" ? "text-red-400" : "text-green-400"
                }
              >
                {line.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

{/*}

**정확한 동작:**
1. Monaco 에디터에 코드 입력 (예: `print(1+2)`)
2. Run 버튼 클릭 
3. 백엔드가 코드 실행
4. **실행 결과 `3`이 터미널에 출력**

## 현재 상태:

```typescript
// EditorPage.tsx - handleRun()
const handleRun = () => {
  // ...
  // 🔥 임시 Mock 결과
  setTimeout(() => {
    addOutput("3");
    addOutput("실행 완료");
  }, 500);
};
```

지금은 **하드코딩된 "3"**이 출력됩니다.

---

## 🎯 올바른 흐름:

### 1. Monaco 에디터에 코드 작성
```python
print(1 + 2)
print("Hello")
```

### 2. Run 버튼 클릭

### 3. 백엔드로 코드 전송
```typescript
POST /api/code/execute
{
  "code": "print(1 + 2)\nprint('Hello')",
  "language": "python"
}
```

### 4. 백엔드 응답
```json
{
  "success": true,
  "data": {
    "output": "3\nHello",
    "error": null
  }
}
```

### 5. 터미널에 결과 표시
```
12:34:56  > Running main.py...
12:34:56  3
12:34:56  Hello
12:34:57  실행 완료
```

---

## 🔧 백엔드 API가 필요합니다!

**API 명세서에 추가되어야 할 내용:**

```yaml
POST /api/code/execute

Request:
{
  "code": string,      # 실행할 코드
  "language": string,  # python, javascript, java 등
  "projectId": number  # (선택) 프로젝트 ID
}

Response:
{
  "success": true,
  "data": {
    "output": string,  # 표준 출력 (stdout)
    "error": string?,  # 에러 메시지 (stderr)
    "exitCode": number # 종료 코드
  }
}
```

---

## 📝 백엔드에 요청해야 할 사항:

1. **코드 실행 API 구현**
   - Docker 컨테이너에서 안전하게 실행
   - 타임아웃 설정 (무한루프 방지)
   - 리소스 제한 (CPU, 메모리)

2. **지원 언어**
   - Python
   - JavaScript (Node.js)
   - Java (선택)
   - 기타 (선택)

3. **보안 고려사항**
   - 파일 시스템 접근 제한
   - 네트워크 접근 제한
   - 실행 시간 제한

---

## 🎨 완전한 구현 예시:---

## ✅ 정리:

### 지금 상황:
- ❌ 백엔드 코드 실행 API 없음
- ✅ 프론트 UI는 준비됨
- ✅ 터미널 출력 구조 완성

### 해야 할 일:
1. **백엔드에 요청**: 코드 실행 API 구현
2. **프론트 작업**: 위의 완전 구현 코드 적용
3. **테스트**: Monaco에 코드 입력 → Run → 터미널에 결과

### 임시 테스트 방법:
- 지금은 터미널 "테스트" 버튼으로 출력 확인
- 백엔드 API 완성되면 실제 코드 실행

**백엔드 팀원분께 코드 실행 API 요청하셔야 합니다!** 📢
*/}