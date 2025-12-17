// TODO: 박유경 - 메시지 목록 컴포넌트 구현
import { useChat } from "../hooks/useChat";

const MY_USER_ID = 3;

export function MessageList() {
  const { messages } = useChat();

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.map((msg, idx) => {
        const isMine = msg.sender.id === MY_USER_ID;

        return (
          <div
            key={idx}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[75%]">
              {/* 닉네임 */}
              {!isMine && (
                <div className="mb-1 text-xs text-gray-400">
                  {msg.sender.nickname}
                </div>
              )}

              {/* 말풍선 */}
              <div
                className={`rounded-lg px-3 py-2 text-sm ${
                  isMine
                    ? "bg-[#3545D6] text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>

              {/* 시간 */}
              <div
                className={`mt-1 text-[10px] text-gray-500 ${
                  isMine ? "text-right" : "text-left"
                }`}
              >
                {new Date(msg.sentAt).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

