import { create } from "zustand";

interface TerminalLine {
  id: string;
  type: "output" | "error";
  text: string;
  timestamp: string;
}

interface TerminalState {
  lines: TerminalLine[];
  
  addOutput: (text: string) => void;
  addError: (text: string) => void;
  clear: () => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  lines: [],

  addOutput: (text) =>
    set((state) => ({
      lines: [
        ...state.lines,
        {
          id: crypto.randomUUID(),
          type: "output",
          text,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    })),

  addError: (text) =>
    set((state) => ({
      lines: [
        ...state.lines,
        {
          id: crypto.randomUUID(),
          type: "error",
          text,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    })),

  clear: () => set({ lines: [] }),
}));