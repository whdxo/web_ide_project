export interface FileNode {
  id: string;
  name: string;
  type: 'FILE' | 'DIRECTORY';
  children?: FileNode[];
}
