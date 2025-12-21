import React, { useState } from 'react';
import { Sidebar } from '@/shared/components/Layout/Sidebar';
import { ProjectList } from '@/features/project/components/ProjectList';
import { SprintView } from '@/features/schedule/components/SprintView';
import { TodoList } from '@/features/schedule/components/TodoList';

export const ProjectSelectionPage = () => {
  const [isTodoOpen, setIsTodoOpen] = useState(false);

  const handleMenuClick = (label: string) => {
    if (label === '일정') {
      setIsTodoOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-black">
      <Sidebar onMenuClick={handleMenuClick} />
      
      <main className={`flex-1 ml-64 transition-all duration-300 p-12 ${isTodoOpen ? 'mr-80' : ''}`}>
        <ProjectList />
      </main>

      {/* Right Panel (Todo/Schedule) */}
      {isTodoOpen && (
        <aside className="w-80 bg-[#1f1f1f] border-l border-gray-800 flex flex-col fixed right-0 top-0 h-screen z-20 shadow-xl">
          <div className="flex-1 overflow-y-auto">
            <SprintView />
            <TodoList isMainPage={true} />
          </div>
        </aside>
      )}
    </div>
  );
};
