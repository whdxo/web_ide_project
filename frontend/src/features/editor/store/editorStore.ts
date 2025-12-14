import { create } from 'zustand';

interface EditorState {
  activeFileId: string | null;
  setActiveFileId: (id: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeFileId: null,
  setActiveFileId: (id) => set({ activeFileId: id }),
}));
