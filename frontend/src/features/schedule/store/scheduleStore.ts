import { create } from "zustand";

interface ScheduleState {
  currentMonth: Date;
  selectedDate: string;

  nextMonth: () => void;
  prevMonth: () => void;
  selectDate: (date: string) => void;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  currentMonth: new Date(),
  selectedDate: new Date().toISOString().slice(0, 10),

  nextMonth: () =>
    set((state) => ({
      currentMonth: new Date(
        state.currentMonth.getFullYear(),
        state.currentMonth.getMonth() + 1
      ),
    })),

  prevMonth: () =>
    set((state) => ({
      currentMonth: new Date(
        state.currentMonth.getFullYear(),
        state.currentMonth.getMonth() - 1
      ),
    })),

  selectDate: (date) => set({ selectedDate: date }),
}));
