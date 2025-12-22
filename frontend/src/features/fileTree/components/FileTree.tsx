import { useEffect } from "react";
import { useFileTreeStore } from "../store/fileTreeStore";
import { FileNode } from "./FileNode";
import type { FileNode as FileNodeType } from "../../../shared/features-types/file.types";

const MOCK_TREE: FileNodeType[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    path: "src",
    children: [
      {
        id: "2",
        name: "main.tsx",
        type: "file",
        path: "src/main.tsx",
      },
      {
        id: "3",
        name: "components",
        type: "folder",
        path: "src/components",
        children: [
          {
            id: "4",
            name: "Editor.tsx",
            type: "file",
            path: "src/components/Editor.tsx",
          },
        ],
      },
    ],
  },
];

export function FileTree() {
  const tree = useFileTreeStore((s) => s.tree);
  const setTree = useFileTreeStore((s) => s.setTree);

  useEffect(() => {
    if (tree.length === 0) {
      setTree(MOCK_TREE);
    }
  }, [tree.length, setTree]);

  return (
    <div className="h-full select-none">
      {tree.map((node) => (
        <FileNode key={node.id} node={node} />
      ))}
    </div>
  );
}
