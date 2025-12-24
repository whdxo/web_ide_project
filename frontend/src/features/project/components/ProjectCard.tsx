import React from 'react';

interface ProjectCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

export const ProjectCard = ({ title, description, onClick }: ProjectCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="
        group
        w-full h-48 
        bg-white 
        rounded-2xl 
        flex flex-col items-center justify-center 
        cursor-pointer 
        transition-all duration-300 
        hover:bg-brand-blue hover:scale-105 hover:shadow-xl
      "
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center whitespace-pre-wrap text-black group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-center text-transparent group-hover:text-white/80 transition-colors duration-300">
      </p>
    </div>
  );
};
