import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/shared/components/Layout/Sidebar';
import { ProjectCard } from '@/features/project/components/ProjectCard';
import { SprintView } from '@/features/schedule/components/SprintView';
import { TodoList } from '@/features/schedule/components/TodoList';

export const ProjectSelectionPage = () => {
  const navigate = useNavigate();
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  
  const projects = [
    { id: 1, title: 'Web IDE\nProject' },
    { id: 2, title: 'Travel' },
    { id: 3, title: 'Dream' },
  ];

  const handleProjectClick = (projectId: number) => {
    console.log(`Project ${projectId} clicked`);
    navigate('/editor');
  };

  const handleMenuClick = (label: string) => {
    if (label === '일정') {
      setIsTodoOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-black">
      <Sidebar onMenuClick={handleMenuClick} />
      
      <main className={`flex-1 ml-64 transition-all duration-300 flex items-center justify-center p-12 ${isTodoOpen ? 'mr-80' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
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
