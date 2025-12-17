import React from 'react';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-full p-4 border-r border-gray-200">
      <nav>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Menu 1</li>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Menu 2</li>
        </ul>
      </nav>
    </aside>
  );
};
