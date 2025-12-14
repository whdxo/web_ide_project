// editor 전체 페이지
import { FileTree } from "../../fileTree/components/FileTree";
import { useState } from "react";
import { MonacoEditor } from "./MonacoEditor";
import { EditorTabs } from "./EditorTabs";
import { IoChatbubbleEllipsesOutline, IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { VscFiles, VscSave } from "react-icons/vsc";


export function EditorPage() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isFileTreeOpen, setIsFileTreeOpen] = useState(true);


  return (
    <div className="h-screen bg-[#0f111a] text-gray-100 overflow-hidden flex flex-col">

      {/* header */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-[#181818] border-b border-gray-800 flex items-center px-4 z-50">
        <h1 className="text-xl font-semibold tracking-wide">EditUs</h1>

        <div className="ml-auto flex items-center gap-3">

        {/* 오른쪽 사이드 패널 */}
        <button
            onClick={() => setIsRightPanelOpen((prev) => !prev)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300"
            >
            <IoChatbubbleEllipsesOutline size={20} />
        </button>

        <button
            onClick={() => setIsRightPanelOpen((prev) => !prev)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300"
            >
            <IoCalendarOutline size={20} />
        </button>

        <button
            onClick={() => setIsRightPanelOpen((prev) => !prev)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300"
            >
            <RiRobot2Fill size={20} />
        </button>

        <button
            onClick={() => setIsRightPanelOpen((prev) => !prev)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300"
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
          <div className="h-40 bg-[#181818] border-t border-gray-800 flex items-center justify-center text-sm">
            TERMINAL 자리
          </div>
        </main>

        {/* 우측 패널(토글) */}
        {isRightPanelOpen && (
          <aside className="w-80 bg-[#1f1f1f] border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-semibold">우측 패널</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-3 text-sm">
              {/* 여기에 채팅 / todo / AI 컴포넌트 들어갈 예정 */}
              패널 내용
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}