import { FileTree } from "../../fileTree/components/FileTree";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import { codeApi } from "@/shared/api/codeApi";

export function EditorPage() {
  const location = useLocation();
  const { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const [isFileTreeOpen, setIsFileTreeOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  type RightPanelType = "chat" | "todo" | "ai" | "settings" | "members" | null;
  const [rightPanel, setRightPanel] = useState<RightPanelType>(null);

  const { openFiles, activeFileId } = useEditorStore();
  const saveFile = useSaveFile();
  const { addOutput, addError } = useTerminalStore();

  // URL에서 가져온 projectId 또는 임시 값
  const projectId = projectIdParam ? Number(projectIdParam) : 1;
  // TODO: 실제 로그인 유저 ID
  const currentUserId = 1;

  useEffect(() => {
    if (location.state?.openPanel) {
      setRightPanel(location.state.openPanel as RightPanelType);
    }
  }, [location.state]);

  const togglePanel = (panel: RightPanelType) => {
    setRightPanel((prev) => (prev === panel ? null : panel));
  };

  /**
   * Monaco Editor 언어 → Judge0 언어 변환
   */
  const getExecutionLanguage = (monacoLanguage: string): string => {
    const languageMap: Record<string, string> = {
      javascript: 'javascript',
      typescript: 'typescript',
      python: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      ruby: 'ruby',
      go: 'go',
      rust: 'rust',
      php: 'php',
    };
    return languageMap[monacoLanguage.toLowerCase()] || 'python';
  };

  const handleSave = () => {
    const activeFile = openFiles.find((f) => f.id === activeFileId);
    if (!activeFile) {
      console.log("저장할 파일이 없습니다");
      return;
    }

    saveFile.mutate(
      {
        fileId: activeFile.id,
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

  const handleRun = async () => {
    const activeFile = openFiles.find((f) => f.id === activeFileId);

    if (!activeFile) {
      addError("실행할 파일이 없습니다");
      return;
    }

    // 로딩 상태 시작
    setIsRunning(true);
    addOutput(`> Running ${activeFile.name}...`);
    addOutput('');

    try {
      // 언어 변환
      const executionLanguage = getExecutionLanguage(activeFile.language);

      // API 호출
      const response = await codeApi.executeCode({
        code: activeFile.content,
        language: executionLanguage,
        input: '',
      });

      // 성공 여부 확인
      if (!response.success || !response.data) {
        addError(`실행 실패: ${response.message || '알 수 없는 오류'}`);
        return;
      }

      const { output, error, status, time } = response.data;

      // 실행 결과 출력
      if (output) {
        addOutput(output);
      }

      // 에러가 있으면 에러 출력
      if (error) {
        addError(error);
      }

      // 실행 상태 및 시간 출력
      addOutput('');
      addOutput(`Status: ${status}`);
      addOutput(`Execution time: ${time.toFixed(3)}s`);
      addOutput(`Finished running ${activeFile.name}`);

    } catch (error) {
      // API 호출 실패
      const errorMessage = error instanceof Error
        ? error.message
        : '코드 실행 중 오류가 발생했습니다';
      addError(`❌ ${errorMessage}`);
    } finally {
      // 로딩 상태 종료
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-[#0f111a] text-gray-100 overflow-hidden flex flex-col">
      {/* header */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-[#181818] border-b border-gray-800 flex items-center px-4 z-50">
        <h1 className="text-xl font-semibold tracking-wide">EditUs</h1>

        <div className="ml-auto flex items-center gap-3">
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
            title={saveFile.isPending ? "저장 중..." : "저장"}
            disabled={saveFile.isPending || !activeFileId}
          >
            <VscSave size={20} />
          </button>

          <button
            onClick={handleRun}
            className={`p-2 rounded hover:bg-gray-700 ${
              isRunning
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-green-400 hover:text-green-300'
            }`}
            title={isRunning ? '실행 중...' : '코드 실행'}
            disabled={!activeFileId || isRunning}
          >
            <VscPlay size={20} />
          </button>
        </div>

        {/* 좌측 파일트리 */}
        {isFileTreeOpen && (
          <aside className="w-64 bg-[#181818] border-r border-gray-800 overflow-y-auto">
            <FileTree projectId={projectId} />
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
                <MemberPanel projectId={projectId} currentUserId={currentUserId} />
              )}
              {rightPanel === "settings" && (
                <SettingsPanel 
                  projectId={projectId} 
                  onOpenPanel={(panel) => setRightPanel(panel)}
                />
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}