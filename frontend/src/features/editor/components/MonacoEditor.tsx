// // TODO: 박유경 - Monaco Editor 컴포넌트 구현
import { useEditorStore } from "../store/editorStore";
import Editor from "@monaco-editor/react";

export function MonacoEditor() {
  const { openFiles, activeFileId, updateContent } = useEditorStore();

  const activeFile = openFiles.find(
    (file) => file.id === activeFileId
  );

  if (!activeFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-sm">
        파일을 선택하세요
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

