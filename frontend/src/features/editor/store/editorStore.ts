import { create } from "zustand";

export interface EditorFile {
  id: string;
  name: string;
  path: string;
  language: string;
  content: string;
  updatedAt: string;
}

interface EditorState {
  openFiles: EditorFile[];
  activeFileId: string | null;

  openFile: (file: EditorFile) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string) => void;
  updateContent: (fileId: string, content: string) => void;
  updateFileContent: (fileId: string, content: string) => void; // API로 로드한 내용 반영
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

    set({
      openFiles: newFiles,
      activeFileId:
        activeFileId === fileId ? newFiles.at(-1)?.id ?? null : activeFileId,
    });
  },

  /** 탭 클릭 */
  setActiveFile: (fileId) => set({ activeFileId: fileId }),

  /** 에디터 내용 변경 (사용자 입력) */
  updateContent: (fileId, content) =>
    set((state) => ({
      openFiles: state.openFiles.map((file) =>
        file.id === fileId ? { ...file, content } : file
      ),
    })),

  /** API로 로드한 파일 내용 반영 */
  updateFileContent: (fileId, content) =>
    set((state) => ({
      openFiles: state.openFiles.map((file) =>
        file.id === fileId ? { ...file, content } : file
      ),
    })),
}));