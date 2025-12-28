import { useState } from "react";
import type { FileNode } from "@/shared/features-types/file.types";
import { useEditorStore } from "../../editor/store/editorStore";
import { useFileOperations } from "../hooks/useFileOperations";
import { VscNewFile, VscNewFolder, VscTrash } from "react-icons/vsc";

export function FileNode({
  node,
  projectId,
  depth = 0,
}: {
  node: FileNode;
  projectId: number;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);
  const [isCreating, setIsCreating] = useState<null | "file" | "folder">(null);
  const [tempName, setTempName] = useState("");

  const openFile = useEditorStore((s) => s.openFile);
  const { createFile, createFolder, deleteFile, deleteFolder } = useFileOperations(projectId);

  const handleClick = () => {
    if (node.type === "FILE") {
      openFile({
        id: node.id,
        name: node.name,
        path: node.name, // AI 리뷰를 위한 경로 (현재는 파일명 사용)
        language: node.language || "plaintext",
        content: "",
        updatedAt: new Date().toISOString(),
      });
    } else {
      setOpen((o) => !o);
    }
  };

  const handleCreate = () => {
    if (!tempName.trim()) return;

    if (isCreating === "file") {
      // Infer language from file extension
      const ext = tempName.trim().split('.').pop()?.toLowerCase();
      const languageMap: { [key: string]: string } = {
        'js': 'javascript',
        'ts': 'typescript',
        'py': 'python',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'c',
        'rb': 'ruby',
        'go': 'go',
        'rs': 'rust',
        'php': 'php',
        'html': 'html',
        'css': 'css',
        'json': 'json',
        'md': 'markdown',
      };
      const language = ext && languageMap[ext] ? languageMap[ext] : 'plaintext';

      createFile.mutate({
        name: tempName.trim(),
        folderId: node.id,
        language: language,
        content: "",
      });
    } else if (isCreating === "folder") {
      createFolder.mutate({
        name: tempName.trim(),
        parentId: node.id,
      });
    }

    setIsCreating(null);
    setTempName("");
  };

  const handleDelete = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    if (node.type === "FILE") {
      deleteFile.mutate(node.id);
    } else {
      deleteFolder.mutate(node.id);
    }
  };

  return (
    <>
      {/* 기존 노드 */}
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="p-1 hover:bg-red-600 rounded"
            title="삭제"
          >
            <VscTrash size={14} />
          </button>
        </div>
      </div>

      {/* 생성 입력 UI */}
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
                e.preventDefault();
                e.stopPropagation();
                handleCreate();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                setIsCreating(null);
                setTempName("");
              }
            }}
            className="w-full rounded bg-gray-800 px-1 outline-none text-white"
            placeholder={isCreating === "folder" ? "폴더 이름" : "파일 이름"}
          />
        </div>
      )}

      {/* 자식 노드 */}
      {open &&
        node.children?.map((child) => (
          <FileNode
            key={child.id}
            node={child}
            projectId={projectId}
            depth={depth + 1}
          />
        ))}
    </>
  );
}