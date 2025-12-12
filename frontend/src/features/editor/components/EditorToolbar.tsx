import React from 'react';

export const EditorToolbar = () => {
  return (
    <div className="flex items-center p-2 border-b bg-gray-50">
      <button className="mr-2">Save</button>
      <button>Format</button>
    </div>
  );
};
