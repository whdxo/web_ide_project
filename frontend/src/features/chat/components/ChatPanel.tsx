import { useChatStore } from "../store/chatStore";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { IoPerson } from "react-icons/io5";
import { useChat } from "../hooks/useChat";

interface ChatPanelProps {
  projectId: number;
}

export function ChatPanel({ projectId }: ChatPanelProps) {
  const users = useChatStore((s) => s.users);
  const { sendMessage } = useChat(projectId);

  return (
    <div className="flex h-full flex-col">
      {/* 헤더 */}
      <div className="h-10 flex items-center justify-between border-b border-gray-700 px-3">
        <div>
          <h2 className="text-sm font-semibold">WEB IDE Project</h2>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <IoPerson size={14} />
            <span>{users.length}명 접속 중</span>
          </div>
        </div>
      </div>

      {/* 메시지 */}
      <MessageList />

      {/* 입력 */}
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}
