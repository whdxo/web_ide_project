import React from 'react';

export const ContextMenu = () => {
  return (
    <div className="absolute bg-white border shadow-md rounded p-2">
      <ul>
        <li className="hover:bg-gray-100 cursor-pointer p-1">Rename</li>
        <li className="hover:bg-gray-100 cursor-pointer p-1">Delete</li>
      </ul>
    </div>
  );
};
