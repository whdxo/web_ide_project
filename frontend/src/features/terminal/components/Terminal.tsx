import { useState } from "react";
import { useTerminalStore } from "../store/terminalStore";

export function Terminal() {
  const { lines, runCommand } = useTerminalStore();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    runCommand(input);
    setInput("");
  };

  return (
    <div className="h-full bg-[#181818] text-green-400 font-mono text-xs flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {lines.map((line) => (
          <div key={line.id}>
            {line.type === "input" && (
              <span className="text-blue-400">$ {line.text}</span>
            )}
            {line.type === "output" && <span>{line.text}</span>}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-800 p-2">
        <span className="text-blue-400">$</span>{" "}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none text-green-400 w-full"
          autoFocus
        />
      </form>
    </div>
  );
}
