// TODO: 박유경 - Monaco Editor 컴포넌트 구현
import { useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useFileContent } from "../hooks/useFileContent";
import Editor from "@monaco-editor/react";

export function MonacoEditor() {
  const { openFiles, activeFileId, updateContent, updateFileContent } = useEditorStore();

  const activeFile = openFiles.find((file) => file.id === activeFileId);

  // 활성 파일의 내용을 API로 로드
  const { data: fileData, isLoading } = useFileContent(
    activeFile ? Number(activeFile.id) : null
  );

  // 파일 내용 로드 완료 시 에디터에 반영
  useEffect(() => {
    if (fileData && activeFile) {
      updateFileContent(activeFile.id, fileData.content);
    }
  }, [fileData, activeFile, updateFileContent]);

  if (!activeFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-sm">
        파일을 선택하세요
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-sm">
        파일을 불러오는 중...
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      language={activeFile.language}
      value={activeFile.content}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
      onChange={(value) => {
        updateContent(activeFile.id, value ?? "");
      }}
    />
  );
}