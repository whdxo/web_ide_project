import { create } from "zustand";

interface TerminalLine {
  id: string;
  type: "input" | "output";
  text: string;
}

interface TerminalState {
  lines: TerminalLine[];
  addInput: (text: string) => void;
  addOutput: (text: string) => void;
  runCommand: (command: string) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  lines: [
    { id: "welcome", type: "output", text: "EditUs Terminal v1.0" },
  ],

  addInput: (text) =>
    set((state) => ({
      lines: [
        ...state.lines,
        { id: crypto.randomUUID(), type: "input", text },
      ],
    })),

  addOutput: (text) =>
    set((state) => ({
      lines: [
        ...state.lines,
        { id: crypto.randomUUID(), type: "output", text },
      ],
    })),

  runCommand: (command) =>
    set((state) => {
      const output =
        command === "help"
          ? "Available commands: help, clear"
          : command === "clear"
          ? ""
          : `command not found: ${command}`;

      const newLines =
        command === "clear"
          ? []
          : [
              ...state.lines,
              { id: crypto.randomUUID(), type: "input" as const, text: command },
              { id: crypto.randomUUID(), type: "output" as const, text: output },
            ];

      return { lines: newLines };
    }),
}));
