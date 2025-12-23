// // TODO: 박유경 - Monaco Editor 컴포넌트 구현
// import Editor from "@monaco-editor/react";
// import { useEditorStore } from "../store/editorStore";

// export function MonacoEditor() {
//   const activeFile = useEditorStore((s) => s.activeFile);
//   const updateContent = useEditorStore((s) => s.updateContent);

//   if (!activeFile) {
//     return (
//       <div className="flex h-full items-center justify-center text-sm text-gray-400">
//         파일을 선택하세요.
//       </div>
//     );
//   }

//   return (
//     <Editor
//       height="100%"
//       language={activeFile.language}
//       theme="vs-dark"
//       value={activeFile.content}
//       onChange={(value) => updateContent(value ?? "")}
//       options={{
//         fontSize: 14,
//         minimap: { enabled: false },
//         automaticLayout: true,
//       }}
//     />
//   );
// }

import { useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import Editor from "@monaco-editor/react";
import { fileApi } from "@/shared/api/fileApi";

export function MonacoEditor() {
  const { openFiles, activeFileId, updateContent } = useEditorStore();

  const activeFile = openFiles.find(
    (file) => file.id === activeFileId
  );

  useEffect(() => {
    if (activeFile && activeFile.content === "// Loading...") {
      fileApi.getFileContent(activeFile.id)
        .then((res) => {
          updateContent(activeFile.id, res.data.content ?? "");
        })
        .catch((err) => {
          console.error("Failed to load file content", err);
          updateContent(activeFile.id, "// Failed to load content");
        });
    }
  }, [activeFile?.id, activeFile?.content, updateContent]);

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

