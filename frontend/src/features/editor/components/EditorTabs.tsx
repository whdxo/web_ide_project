// TODO: 박유경 - 에디터 탭 컴포넌트 구현
// MonacoEditor 영역 위 파일 탭
// export function EditorTabs() {
//   return (
//     <div className="flex h-9 items-center gap-2 border-b border-gray-800 bg-[#181818] px-3 text-xs">
//       <div className="rounded bg-gray-800 px-2 py-1">main.tsx</div>
//     </div>
//   );
// }

import { useEditorStore } from "../store/editorStore";
import { VscClose } from "react-icons/vsc";

export function EditorTabs() {
  const openFiles = useEditorStore((s) => s.openFiles);
  const activeFileId = useEditorStore((s) => s.activeFileId);
  const setActiveFile = useEditorStore((s) => s.setActiveFile);
  const closeFile = useEditorStore((s) => s.closeFile);

  return (
    <div className="flex h-9 items-center border-b border-gray-800 bg-[#181818] px-2 text-xs">
      {openFiles.map((file) => (
        <div
          key={file.id}
          onClick={() => setActiveFile(file.id)}
          className={`group flex items-center gap-2 px-3 py-1 cursor-pointer
            ${
              activeFileId === file.id
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
        >
          <span>{file.name}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeFile(file.id);
            }}
            className="opacity-0 group-hover:opacity-100"
          >
            <VscClose size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
