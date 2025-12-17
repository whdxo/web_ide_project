import { useState } from "react";
import { useChat } from "../hooks/useChat";

export function MessageInput() {
  const [text, setText] = useState("");
  const { sendMessage } = useChat();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="border-t border-gray-700 p-2">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메세지를 입력하세요..."
          className="flex-1 rounded bg-gray-700 px-3 py-2 text-sm outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="rounded bg-[#3545D6] px-4 text-sm text-white hover:opacity-90"
        >
          전송
        </button>
      </div>
    </div>
  );
}
