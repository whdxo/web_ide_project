<<<<<<< HEAD
// import { create } from "zustand";
// import type { FileNode } from "../types/file.types";

// interface FileTreeState {
//   tree: FileNode[];
//   setTree: (tree: FileNode[]) => void;
// }

// export const useFileTreeStore = create<FileTreeState>((set) => ({
//   tree: [],
//   setTree: (tree) => set({ tree }),
// }));
import { create } from "zustand";
import type { FileNode } from "../types/file.types";

interface FileTreeState {
  tree: FileNode[];

  setTree: (tree: FileNode[]) => void;

  addNode: (
    parentId: string,
    newNode: FileNode
  ) => void;

  deleteNode: (id: string) => void;
}

/* ===== 유틸 함수 ===== */
function addNodeRecursive(
  nodes: FileNode[],
  parentId: string,
  newNode: FileNode
): FileNode[] {
  return nodes.map((node) => {
    if (node.id === parentId && node.type === "folder") {
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
  targetId: string
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
=======
import { create } from 'zustand';

interface FileTreeState {
  expandedFolders: Set<string>;
  toggleFolder: (folderId: string) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  expandedFolders: new Set(),
  toggleFolder: (folderId) =>
    set((state) => {
      const newExpanded = new Set(state.expandedFolders);
      if (newExpanded.has(folderId)) {
        newExpanded.delete(folderId);
      } else {
        newExpanded.add(folderId);
      }
      return { expandedFolders: newExpanded };
    }),
>>>>>>> frontend-integration
}));
