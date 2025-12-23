import { useState } from "react";
import type { FileNode as FileNodeType } from "@/shared/features-types/file.types";
import { useEditorStore } from "../../editor/store/editorStore";
import { useFileOperations } from "../hooks/useFileOperations";
import {
  VscNewFile,
  VscNewFolder,
  VscTrash,
} from "react-icons/vsc";

export function FileNode({
  node,
  depth = 0,
  projectId,
}: {
  node: FileNodeType;
  depth?: number;
  projectId: number;
}) {
  const [open, setOpen] = useState(true);

  // 🔽 추가: 생성 입력 상태
  const [isCreating, setIsCreating] = useState<null | "file" | "folder">(null);
  const [tempName, setTempName] = useState("");

  const { createFile, createFolder, deleteFile } = useFileOperations(projectId);
  const openFile = useEditorStore((s) => s.openFile);

  const handleClick = () => {
    if (node.type === "FILE") {
      openFile({
        id: node.id,
        name: node.name,
        language: "typescript", // TODO: detect language from extension
        content: "// Loading...", // Content will be loaded by editor
        updatedAt: new Date().toISOString(),
      });
    } else {
      setOpen((o) => !o);
    }
  };

  const handleCreate = () => {
    if (!tempName.trim()) return;

    if (isCreating === "file") {
      createFile.mutate({
        name: tempName.trim(),
        parent_folder_id: node.id,
        content: "",
      });
    } else if (isCreating === "folder") {
      createFolder.mutate({
        name: tempName.trim(),
        parent_folder_id: node.id,
      });
    }
    setIsCreating(null);
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
          {node.type === "FOLDER" ? (open ? "📂" : "📁") : "📄"}
          <span>{node.name}</span>
        </div>

        {/* hover 액션 */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          {node.type === "FOLDER" && (
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
              if (confirm("정말 삭제하시겠습니까?")) {
                deleteFile.mutate(node.id);
              }
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
              if (e.key === "Enter") {
                handleCreate();
              }
              if (e.key === "Escape") {
                setIsCreating(null);
              }
            }}
            onBlur={() => setIsCreating(null)}
            className="w-full rounded bg-gray-800 px-1 outline-none text-white"
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
            projectId={projectId}
          />
        ))}
    </>
  );
}
