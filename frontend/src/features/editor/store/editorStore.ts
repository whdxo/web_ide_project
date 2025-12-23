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
}

export const useEditorStore = create<EditorState>((set, get) => ({
  openFiles: [],
  activeFileId: null,

  /** 파일 열기 (탭 생성 or 포커스) */
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

  /** 탭 닫기 */
  closeFile: (fileId) => {
    const { openFiles, activeFileId } = get();
    const newFiles = openFiles.filter((f) => f.id !== fileId);
    const lastFile = newFiles.length > 0 ? newFiles[newFiles.length - 1] : null;

    set({
      openFiles: newFiles,
      activeFileId:
        activeFileId === fileId
          ? lastFile?.id ?? null
          : activeFileId,
    });
  },

  /** 탭 클릭 */
  setActiveFile: (fileId) => set({ activeFileId: fileId }),

  /** 🔥 에디터 내용 변경 */
  updateContent: (fileId, content) =>
    set((state) => ({
      openFiles: state.openFiles.map((file) =>
        file.id === fileId
          ? { ...file, content }
          : file
      ),
    })),
}));
