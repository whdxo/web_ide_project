// editor 전체 페이지
import { FileTree } from "../../fileTree/components/FileTree";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MonacoEditor } from "./MonacoEditor";
import { EditorTabs } from "./EditorTabs";
import { IoChatbubbleEllipsesOutline, IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { VscFiles, VscSave } from "react-icons/vsc";
import { ChatPanel } from "@/features/chat/components/ChatPanel";
import { TodoList } from "@/features/schedule/components/TodoList";
import { AIReviewPanel } from "@/features/ai/components/AIReviewPanel";
import { Terminal } from "@/features/terminal/components/Terminal";
import { SprintView } from "@/features/schedule/components/SprintView";
import { SettingsPanel } from "@/features/setting/components/SettingPanel";


export function EditorPage() {
  const location = useLocation();
  const [isFileTreeOpen, setIsFileTreeOpen] = useState(true);

  type RightPanelType = "chat" | "todo" | "ai" | "settings" | null;
  const [rightPanel, setRightPanel] = useState<RightPanelType>(null);

  useEffect(() => {
    if (location.state?.openPanel) {
      setRightPanel(location.state.openPanel as RightPanelType);
    }
  }, [location.state]);

  const togglePanel = (panel: RightPanelType) => {
    setRightPanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <div className="h-screen bg-[#0f111a] text-gray-100 overflow-hidden flex flex-col">

      {/* header */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-[#181818] border-b border-gray-800 flex items-center px-4 z-50">
        <h1 className="text-xl font-semibold tracking-wide">EditUs</h1>

        <div className="ml-auto flex items-center gap-3">

        {/* 오른쪽 사이드 패널 */}
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

        {/* 🟦 Activity Bar (여기에 추가) */}
        <div className="w-12 bg-[#181818] border-r border-gray-800 flex flex-col items-center py-2 gap-3">

          {/* 파일트리 토글 */}
          <button
            onClick={() => setIsFileTreeOpen(prev => !prev)}
            className={`p-2 rounded hover:bg-gray-700 ${
              isFileTreeOpen ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            title="파일 트리"
          >
            <VscFiles size={20} />
          </button>

          {/* 저장 버튼 */}
          <button
            onClick={() => {
              console.log("저장 클릭");
            }}
            className="p-2 rounded hover:bg-gray-700 text-gray-400"
            title="저장"
          >
            <VscSave size={20} />
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

          {/* 파일 탭 */}
          <EditorTabs />

          {/* 에디터 영역 */}
          <div className="flex-1 overflow-hidden">
            <MonacoEditor />
          </div>

          {/* 터미널 영역 */}
          <div className="h-40 border-t border-gray-800">
            <Terminal />
          </div>

        </main>

        {/* 우측 패널(토글) */}
        {rightPanel && (
          <aside className="w-80 bg-[#1f1f1f] border-l border-gray-800 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {rightPanel === "chat" && <ChatPanel />}
              {rightPanel === "todo" && (
                <>
                  <SprintView/>
                  <TodoList />
                </>
              )}
              {rightPanel === "ai" && <AIReviewPanel />}
              {rightPanel === "settings" && <SettingsPanel/>}
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}