// import { create } from "zustand";
// import type { EditorFile } from "../types/editor.types";

// interface EditorState {
//   activeFile: EditorFile | null;
//   isSaving: boolean;

//   setActiveFile: (file: EditorFile) => void;
//   updateContent: (content: string) => void;
//   setSaving: (saving: boolean) => void;
// }

// export const useEditorStore = create<EditorState>((set) => ({
//   activeFile: null,
//   isSaving: false,

//   setActiveFile: (file) => set({ activeFile: file }),
//   updateContent: (content) =>
//     set((state) =>
//       state.activeFile
//         ? { activeFile: { ...state.activeFile, content } }
//         : state
//     ),
//   setSaving: (saving) => set({ isSaving: saving }),
// }));


import { create } from 'zustand';

interface EditorState {
  activeFileId: string | null;
  setActiveFileId: (id: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeFileId: null,
  setActiveFileId: (id) => set({ activeFileId: id }),
}));