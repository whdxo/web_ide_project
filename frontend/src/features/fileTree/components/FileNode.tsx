// // TODO: 박유경 - 파일 노드 컴포넌트 구현
import { useState } from "react";
import type { FileNode as FileNodeType } from "../types/file.types";
import { useEditorStore } from "../../editor/store/editorStore";
import { useFileTreeStore } from "../store/fileTreeStore";
import {
  VscNewFile,
  VscNewFolder,
  VscTrash,
} from "react-icons/vsc";

export function FileNode({
  node,
  depth = 0,
}: {
  node: FileNodeType;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);

  // 🔽 추가: 생성 입력 상태
  const [isCreating, setIsCreating] = useState<null | "file" | "folder">(null);
  const [tempName, setTempName] = useState("");

  const setActiveFile = useEditorStore((s) => s.setActiveFile);
  const { addNode, deleteNode } = useFileTreeStore();

  const openFile = useEditorStore((s) => s.openFile);

  const handleClick = () => {
    if (node.type === "file") {
      openFile({
        id: node.id,
        name: node.name,
        path: node.path,
        language: "typescript",
        content: "// TODO: 파일 내용 로드",
        updatedAt: new Date().toISOString(),
      });
    } else {
      setOpen((o) => !o);
    }
  };


  return (
    <>
      {/* ===== 기존 노드 ===== */}
      <div
        className="group flex items-center justify-between rounded px-2 py-1 text-xs hover:bg-gray-800 cursor-pointer"
        style={{ paddingLeft: depth * 12 + 8 }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-1">
          {node.type === "folder" ? (open ? "📂" : "📁") : "📄"}
          <span>{node.name}</span>
        </div>

        {/* hover 액션 */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          {node.type === "folder" && (
            <>
              {/* 파일 추가 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreating("file");
                  setTempName("");
                  setOpen(true);
                }}
                className="p-1 hover:bg-gray-700 rounded"
                title="파일 추가"
              >
                <VscNewFile size={14} />
              </button>

              {/* 폴더 추가 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreating("folder");
                  setTempName("");
                  setOpen(true);
                }}
                className="p-1 hover:bg-gray-700 rounded"
                title="폴더 추가"
              >
                <VscNewFolder size={14} />
              </button>
            </>
          )}

          {/* 삭제 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(node.id);
            }}
            className="p-1 hover:bg-red-600 rounded"
            title="삭제"
          >
            <VscTrash size={14} />
          </button>
        </div>
      </div>

      {/* ===== 🔥 생성 입력 UI ===== */}
      {isCreating && (
        <div
          className="flex items-center gap-1 px-2 py-1 text-xs"
          style={{ paddingLeft: (depth + 1) * 12 + 8 }}
        >
          <span>{isCreating === "folder" ? "📁" : "📄"}</span>

          <input
            autoFocus
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tempName.trim()) {
                addNode(node.id, {
                  id: crypto.randomUUID(),
                  name: tempName.trim(),
                  type: isCreating,
                  path: "",
                  ...(isCreating === "folder" ? { children: [] } : {}),
                });
                setIsCreating(null);
              }

              if (e.key === "Escape") {
                setIsCreating(null);
              }
            }}
            onBlur={() => setIsCreating(null)}
            className="w-full rounded bg-gray-800 px-1 outline-none"
            placeholder={
              isCreating === "folder" ? "폴더 이름" : "파일 이름"
            }
          />
        </div>
      )}

      {/* ===== 자식 노드 ===== */}
      {open &&
        node.children?.map((child) => (
          <FileNode
            key={child.id}
            node={child}
            depth={depth + 1}
          />
        ))}
    </>
  );
}
