import React from 'react';
import { Sidebar } from '@/shared/components/Layout/Sidebar';
import { ProjectCard } from '@/features/project/components/ProjectCard';

export const ProjectSelectionPage = () => {
  const projects = [
    { id: 1, title: 'Web IDE\nProject' },
    { id: 2, title: 'Travel' },
    { id: 3, title: 'Dream' },
  ];

  const handleProjectClick = (projectId: number) => {
    console.log(`Project ${projectId} clicked`);
    // TODO: Navigate to editor
  };

  return (
    <div className="flex min-h-screen bg-brand-black">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex items-center justify-center p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
