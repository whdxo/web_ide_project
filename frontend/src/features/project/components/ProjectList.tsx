import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Button } from '@/shared/components/Button';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Trash2 } from 'lucide-react';

interface ProjectListProps {
  onOpenCreateModal: () => void;
  onOpenJoinModal: () => void;
}

export const ProjectList = ({ onOpenCreateModal, onOpenJoinModal }: ProjectListProps) => {
  const navigate = useNavigate();
  const { projects, isLoading, deleteProject } = useProjects();
  const user = useAuthStore((state) => state.user);

  const handleDelete = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    if (window.confirm('정말로 이 프로젝트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteProject(projectId);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">내 프로젝트</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={onOpenJoinModal}>
            초대 코드로 참여
          </Button>
          <Button onClick={onOpenCreateModal}>
            새 프로젝트 생성
          </Button>
        </div>
      </div>

      {projects?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">아직 참여 중인 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <div
              key={project.project_id}
              onClick={() => navigate(`/projects/${project.project_id}/editor`)}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
                {user?.userId === project.owner_id && (
                  <button
                    onClick={(e) => handleDelete(e, project.project_id)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                    title="프로젝트 삭제"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description || '설명이 없습니다.'}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

