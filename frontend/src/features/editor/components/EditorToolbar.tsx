import React from 'react';

export const EditorToolbar = () => {
  return (
    <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <button className="mr-2">Save</button>
      <button>Format</button>
    </div>
  );
};
