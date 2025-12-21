import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { CreateProjectModal } from './CreateProjectModal';
import { JoinProjectModal } from './JoinProjectModal';
import { Button } from '@/shared/components/Button';

export const ProjectList = () => {
  const { projects, isLoading } = useProjects();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  if (isLoading) {
    return <div className="flex justify-center p-8">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">내 프로젝트</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => setIsJoinModalOpen(true)}>
            초대 코드로 참여
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            새 프로젝트 생성
          </Button>
        </div>
      </div>

      {projects?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">아직 참여 중인 프로젝트가 없습니다.</p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            첫 프로젝트 만들기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.type === 'PERSONAL' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {project.type === 'PERSONAL' ? '개인' : '팀'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description || '설명이 없습니다.'}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{project.language}</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      <JoinProjectModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
};

