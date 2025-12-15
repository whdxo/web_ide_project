<<<<<<< HEAD
export type FileType = "file" | "folder";

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  path: string;
=======
export interface FileNode {
  id: string;
  name: string;
  type: 'FILE' | 'DIRECTORY';
>>>>>>> frontend-integration
  children?: FileNode[];
}
