// 터미널 영역
export function EditorToolbar() {
  return (
    <div className="flex h-10 items-center justify-between border-b border-gray-700 bg-gray-900 px-3 text-xs">
      <div className="flex gap-2">
        <button className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700">Run</button>
        <button className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700">Save</button>
      </div>
      <div className="text-gray-400">TERMINAL</div>
    </div>
  );
}
