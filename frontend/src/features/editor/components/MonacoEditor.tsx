// TODO: 박유경 - Monaco Editor 컴포넌트 구현
import Editor from "@monaco-editor/react";
import { useEditorStore } from "../store/editorStore";

export function MonacoEditor() {
  const activeFile = useEditorStore((s) => s.activeFile);
  const updateContent = useEditorStore((s) => s.updateContent);

  if (!activeFile) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        파일을 선택하세요.
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      language={activeFile.language}
      theme="vs-dark"
      value={activeFile.content}
      onChange={(value) => updateContent(value ?? "")}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
}
