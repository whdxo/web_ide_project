import { api } from '../../../shared/utils/api';

export const fileApi = {
  getFiles: async (projectId: string) => {
    const response = await api.get(`/projects/${projectId}/files`);
    return response.data;
  },
  createFile: async (data: { projectId: string; name: string; type: 'FILE' | 'DIRECTORY' }) => {
    const response = await api.post(`/files`, data);
    return response.data;
  },
};
