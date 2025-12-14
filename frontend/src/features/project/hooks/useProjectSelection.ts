import { create } from 'zustand';

interface ProjectSelectionState {
  selectedProjectId: string | null;
  selectProject: (id: string) => void;
}

export const useProjectSelectionStore = create<ProjectSelectionState>((set) => ({
  selectedProjectId: null,
  selectProject: (id) => set({ selectedProjectId: id }),
}));

export const useProjectSelection = () => {
  return useProjectSelectionStore();
};
