<<<<<<< HEAD
export type EditorLanguage = "javascript" | "typescript" | "html" | "css";

export interface EditorFile {
  id: string;
  name: string;
  path: string;
  language: EditorLanguage;
  content: string;
  updatedAt: string;
=======
// TODO: 박유경 - 에디터 타입 정의
export interface EditorFile {
  id: string;
  content: string;
  language: string;
>>>>>>> frontend-integration
}
