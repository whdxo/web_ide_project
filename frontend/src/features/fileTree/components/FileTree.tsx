import { useFileTree } from "../hooks/useFileTree";
import { FileNode } from "./FileNode";

interface FileTreeProps {
  projectId: number;
}

export function FileTree({ projectId }: FileTreeProps) {
  const { data, isLoading, error } = useFileTree(projectId);

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

  if (!data || !data.rootFolders || data.rootFolders.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-xs">
        파일이 없습니다
      </div>
    );
  }

  return (
    <div className="h-full select-none">
      {data.rootFolders.map((node) => (
        <FileNode key={node.id} node={node} projectId={projectId} />
      ))}
    </div>
  );
}