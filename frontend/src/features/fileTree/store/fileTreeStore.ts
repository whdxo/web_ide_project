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
}));
