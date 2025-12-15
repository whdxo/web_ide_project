<<<<<<< HEAD
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
=======
import React from 'react';

export const EditorToolbar = () => {
  return (
    <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <button className="mr-2">Save</button>
      <button>Format</button>
    </div>
  );
};
>>>>>>> frontend-integration
