import { useState } from "react";
import { useFileTree } from "../hooks/useFileTree";
import { useFileOperations } from "../hooks/useFileOperations";
import { FileNode } from "./FileNode";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

interface FileTreeProps {
  projectId: number;
}

export function FileTree({ projectId }: FileTreeProps) {
  const { data, isLoading, error } = useFileTree(projectId);
  const { createFile, createFolder } = useFileOperations(projectId);

  const [isCreating, setIsCreating] = useState<null | "file" | "folder">(null);
  const [tempName, setTempName] = useState("");

  const handleCreate = () => {
    if (!tempName.trim()) return;

    if (isCreating === "file") {
      createFile.mutate({
        name: tempName.trim(),
        content: "",
        parent_folder_id: null, // 루트에 생성
      });
    } else if (isCreating === "folder") {
      createFolder.mutate({
        name: tempName.trim(),
        parent_folder_id: null, // 루트에 생성
      });
    }

    setIsCreating(null);
    setTempName("");
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-xs">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 text-xs">
        파일 트리를 불러올 수 없습니다
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col select-none">
      {/* 헤더 + 루트 생성 버튼 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
        <span className="text-xs text-gray-400 font-semibold">파일 탐색기</span>
        <div className="flex gap-1">
          <button
            onClick={() => {
              setIsCreating("file");
              setTempName("");
            }}
            className="p-1 rounded hover:bg-gray-700 text-gray-400"
            title="새 파일"
          >
            <VscNewFile size={16} />
          </button>
          <button
            onClick={() => {
              setIsCreating("folder");
              setTempName("");
            }}
            className="p-1 rounded hover:bg-gray-700 text-gray-400"
            title="새 폴더"
          >
            <VscNewFolder size={16} />
          </button>
        </div>
      </div>

      {/* 파일 트리 */}
      <div className="flex-1 overflow-y-auto">
        {/* 생성 입력 UI (루트) */}
        {isCreating && (
          <div className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-800/50">
            <span>{isCreating === "folder" ? "📁" : "📄"}</span>
            <input
              autoFocus
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
                if (e.key === "Escape") setIsCreating(null);
              }}
              onBlur={() => setIsCreating(null)}
              className="flex-1 rounded bg-gray-700 px-2 py-1 outline-none text-white"
              placeholder={isCreating === "folder" ? "폴더 이름" : "파일 이름"}
            />
          </div>
        )}

        {/* 파일 목록 */}
        {!data || !data.rootFolders || data.rootFolders.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-xs">
            {isCreating ? null : "파일이 없습니다. 새 파일이나 폴더를 생성하세요."}
          </div>
        ) : (
          data.rootFolders.map((node) => (
            <FileNode key={node.id} node={node} projectId={projectId} />
          ))
        )}
      </div>
    </div>
  );
}