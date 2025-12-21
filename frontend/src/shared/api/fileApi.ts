import { apiClient } from './client';

export const fileApi = {
  getFiles: async (projectId: string) => {
    const response = await apiClient.get(`/projects/${projectId}/files`);
    return response.data;
  },
  createFile: async (data: { projectId: string; name: string; type: 'FILE' | 'DIRECTORY' }) => {
    const response = await apiClient.post(`/files`, data);
    return response.data;
  },
};
