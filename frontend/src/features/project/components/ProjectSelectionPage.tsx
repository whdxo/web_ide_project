import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/shared/components/Layout/Sidebar';
import { ProjectList } from '@/features/project/components/ProjectList';
import { SprintView } from '@/features/schedule/components/SprintView';
import { TodoList } from '@/features/schedule/components/TodoList';
import { useAuthStore } from '@/features/auth/store/authStore';
import { CreateProjectModal } from './CreateProjectModal';
import { JoinProjectModal } from './JoinProjectModal';

export const ProjectSelectionPage = () => {
  const navigate = useNavigate();
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleMenuClick = (label: string) => {
    if (label === '일정') {
      setIsTodoOpen((prev) => !prev);
    } else if (label === '새 프로젝트 생성') {
      setIsCreateModalOpen(true);
    } else if (label === '초대 링크로 참여') {
      setIsJoinModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-brand-black">
      <Sidebar 
        userName={user?.name} 
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
      />
      
      <main className={`flex-1 ml-64 transition-all duration-300 p-12 ${isTodoOpen ? 'mr-80' : ''}`}>
        <ProjectList 
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />
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
