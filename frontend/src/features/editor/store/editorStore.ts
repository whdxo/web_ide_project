import { create } from "zustand";

export interface EditorFile {
  id: number;
  name: string;
  path?: string;
  language: string;
  content: string;
  updatedAt: string;
}

interface EditorState {
  openFiles: EditorFile[];
  activeFileId: number | null;

  openFile: (file: EditorFile) => void;
  closeFile: (fileId: number) => void;
  setActiveFile: (fileId: number) => void;
  updateContent: (fileId: number, content: string) => void;
  updateFileContent: (fileId: number, content: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  openFiles: [],
  activeFileId: null,

  openFile: (file) => {
    const { openFiles } = get();
    const exists = openFiles.find((f) => f.id === file.id);

    if (exists) {
      set({ activeFileId: file.id });
    } else {
      set({
        openFiles: [...openFiles, file],
        activeFileId: file.id,
      });
    }
  },

  closeFile: (fileId) => {
    const { openFiles, activeFileId } = get();
    const newFiles = openFiles.filter((f) => f.id !== fileId);

    set({
      openFiles: newFiles,
      activeFileId: activeFileId === fileId ? newFiles.at(-1)?.id ?? null : activeFileId,
    });
  },

  setActiveFile: (fileId) => set({ activeFileId: fileId }),

  updateContent: (fileId, content) =>
    set((state) => ({
      openFiles: state.openFiles.map((file) =>
        file.id === fileId ? { ...file, content } : file
      ),
    })),

  updateFileContent: (fileId, content) =>
    set((state) => ({
      openFiles: state.openFiles.map((file) =>
        file.id === fileId ? { ...file, content } : file
      ),
    })),
}));