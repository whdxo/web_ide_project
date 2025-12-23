// editor page
import { FileTree } from "../../fileTree/components/FileTree";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MonacoEditor } from "./MonacoEditor";
import { EditorTabs } from "./EditorTabs";
import {
  IoChatbubbleEllipsesOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoPeople,
} from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { VscFiles, VscSave, VscPlay } from "react-icons/vsc";
import { ChatPanel } from "@/features/chat/components/ChatPanel";
import { useTerminalStore } from "@/features/terminal/store/terminalStore";
import { TodoList } from "@/features/schedule/components/TodoList";
import { AIReviewPanel } from "@/features/ai/components/AIReviewPanel";
import { Terminal } from "@/features/terminal/components/Terminal";
import { SprintView } from "@/features/schedule/components/SprintView";
import { SettingsPanel } from "@/features/setting/components/SettingPanel";
import { MemberPanel } from "@/features/member/components/MemberPanel";
import { useEditorStore } from "../store/editorStore";
import { useSaveFile } from "../hooks/useFileContent";
//import { useAuthStore } from "@/features/auth/store/authStore";

export function EditorPage() {
  const location = useLocation();
  const [isFileTreeOpen, setIsFileTreeOpen] = useState(true);

  type RightPanelType = "chat" | "todo" | "ai" | "settings" | "members" | null;
  const [rightPanel, setRightPanel] = useState<RightPanelType>(null);

  const { openFiles, activeFileId } = useEditorStore();
  const saveFile = useSaveFile();
  const { addOutput, addError } = useTerminalStore();

  // TODO: 실제 프로젝트 ID와 현재 사용자 ID를 context/store에서 가져와야 함
  // 임시 하드 코딩
  const projectId = 1;
  const currentUserId = 1;
  //const currentUserId = useAuthStore((s) => s.user?.userId);

  useEffect(() => {
    if (location.state?.openPanel) {
      setRightPanel(location.state.openPanel as RightPanelType);
    }
  }, [location.state]);

  const togglePanel = (panel: RightPanelType) => {
    setRightPanel((prev) => (prev === panel ? null : panel));
  };

  const handleSave = () => {
    const activeFile = openFiles.find((f) => f.id === activeFileId);
    if (!activeFile) {
      console.log("저장할 파일이 없습니다");
      return;
    }

    saveFile.mutate(
      {
        fileId: Number(activeFile.id),
        content: activeFile.content,
      },
      {
        onSuccess: () => {
          console.log("✅ 파일 저장 완료:", activeFile.name);
        },
        onError: (error) => {
          console.error("❌ 파일 저장 실패:", error);
        },
      }
    );
  };

  // 코드 실행 (임시 - 백엔드 API 연동 필요)
  const handleRun = () => {
    const activeFile = openFiles.find((f) => f.id === activeFileId);
    if (!activeFile) {
      addError("실행할 파일이 없습니다");
      return;
    }

    addOutput(`> Running ${activeFile.name}...`);
    
    // TODO: 실제 API 호출로 대체
    // const result = await executeCode({
    //   code: activeFile.content,
    //   language: activeFile.language
    // });
    
    // 임시 Mock 결과
    setTimeout(() => {
      addOutput("3");
      addOutput("실행 완료");
    }, 500);
  };

  return (
    <div className="h-screen bg-[#0f111a] text-gray-100 overflow-hidden flex flex-col">
      {/* header */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-[#181818] border-b border-gray-800 flex items-center px-4 z-50">
        <h1 className="text-xl font-semibold tracking-wide">EditUs</h1>
        <div className="ml-auto flex items-center gap-3">
          {/* 멤버 목록 버튼 */}
          <button
            onClick={() => togglePanel("members")}
            className={`p-2 rounded-md ${
              rightPanel === "members"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
            title="멤버 목록"
          >
            <IoPeople size={20} />
          </button>

          {/* 채팅 버튼 */}
          <button
            onClick={() => togglePanel("chat")}
            className={`p-2 rounded-md ${
              rightPanel === "chat"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            <IoChatbubbleEllipsesOutline size={20} />
          </button>

          {/* 일정/투두 버튼 */}
          <button
            onClick={() => togglePanel("todo")}
            className={`p-2 rounded-md ${
              rightPanel === "todo"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            <IoCalendarOutline size={20} />
          </button>

          {/* AI 리뷰 버튼 */}
          <button
            onClick={() => togglePanel("ai")}
            className={`p-2 rounded-md ${
              rightPanel === "ai"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            <RiRobot2Fill size={20} />
          </button>

          {/* 설정 버튼 */}
          <button
            onClick={() => togglePanel("settings")}
            className={`p-2 rounded-md ${
              rightPanel === "settings"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            <IoSettingsOutline size={20} />
          </button>
        </div>
      </header>

      {/* 전체 레이아웃 */}
      <div className="flex flex-1 pt-12 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#181818] border-r border-gray-800 flex flex-col items-center py-2 gap-3">
          <button
            onClick={() => setIsFileTreeOpen((prev) => !prev)}
            className={`p-2 rounded hover:bg-gray-700 ${
              isFileTreeOpen ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            title="파일 트리"
          >
            <VscFiles size={20} />
          </button>

          <button
            onClick={handleSave}
            className={`p-2 rounded hover:bg-gray-700 ${
              saveFile.isPending ? "text-gray-600" : "text-gray-400"
            }`}
            title={saveFile.isPending ? "저장 중..." : "저장 (Ctrl+S)"}
            disabled={saveFile.isPending || !activeFileId}
          >
            <VscSave size={20} />
          </button>

          {/* 터미널 Run 버튼 */}
          <button
            onClick={handleRun}
            className="p-2 rounded hover:bg-gray-700 text-green-400 hover:text-green-300"
            title="코드 실행"
            disabled={!activeFileId}
          >
            <VscPlay size={20} />
          </button>
        </div>

        {/* 좌측 파일트리 */}
        {isFileTreeOpen && (
          <aside className="w-64 bg-[#181818] border-r border-gray-800 overflow-y-auto">
            <FileTree />
          </aside>
        )}

        {/* 에디터 */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <EditorTabs />
          <div className="flex-1 overflow-hidden">
            <MonacoEditor />
          </div>
          <div className="h-40 border-t border-gray-800">
            <Terminal />
          </div>
        </main>

        {/* 우측 패널 */}
        {rightPanel && (
          <aside className="w-80 bg-[#1f1f1f] border-l border-gray-800 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {rightPanel === "chat" && <ChatPanel />}
              {rightPanel === "todo" && (
                <>
                  <SprintView />
                  <TodoList />
                </>
              )}
              {rightPanel === "ai" && <AIReviewPanel />}
              {rightPanel === "members" && (
                <MemberPanel
                  projectId={projectId}
                  currentUserId={currentUserId}
                />
              )}
              {rightPanel === "settings" && <SettingsPanel />}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}