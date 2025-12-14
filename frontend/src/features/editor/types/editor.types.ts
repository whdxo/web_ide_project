export type EditorLanguage = "javascript" | "typescript" | "html" | "css";

export interface EditorFile {
  id: string;
  name: string;
  path: string;
  language: EditorLanguage;
  content: string;
  updatedAt: string;
}
