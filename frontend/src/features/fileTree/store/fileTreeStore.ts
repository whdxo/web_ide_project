import { create } from "zustand";
import type { FileNode } from "@/shared/features-types/file.types";

interface FileTreeState {
  tree: FileNode[];

  setTree: (tree: FileNode[]) => void;

  addNode: (
    parentId: number,
    newNode: FileNode
  ) => void;

  deleteNode: (id: number) => void;
}

/* ===== 유틸 함수 ===== */
function addNodeRecursive(
  nodes: FileNode[],
  parentId: number,
  newNode: FileNode
): FileNode[] {
  return nodes.map((node) => {
    if (node.id === parentId && node.type === "FOLDER") {
      return {
        ...node,
        children: [...(node.children ?? []), newNode],
      };
    }

    if (node.children) {
      return {
        ...node,
        children: addNodeRecursive(node.children, parentId, newNode),
      };
    }

    return node;
  });
}

function deleteNodeRecursive(
  nodes: FileNode[],
  targetId: number
): FileNode[] {
  return nodes
    .filter((node) => node.id !== targetId)
    .map((node) => ({
      ...node,
      children: node.children
        ? deleteNodeRecursive(node.children, targetId)
        : undefined,
    }));
}

/* ===== Store ===== */
export const useFileTreeStore = create<FileTreeState>((set) => ({
  tree: [],

  setTree: (tree) => set({ tree }),

  addNode: (parentId, newNode) =>
    set((state) => ({
      tree: addNodeRecursive(state.tree, parentId, newNode),
    })),

  deleteNode: (id) =>
    set((state) => ({
      tree: deleteNodeRecursive(state.tree, id),
    })),
}));
