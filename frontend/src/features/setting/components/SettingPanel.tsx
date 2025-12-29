import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useDeleteProject, useLeaveProjectFromEditor } from "@/features/project/hooks/useProjects";
import { InviteMemberModal } from "@/features/member/components/InviteMemberModal";
import { DeleteProjectModal } from "@/features/project/components/DeleteProjectModal";
import { authApi } from "@/shared/api/authApi";
import { projectApi } from "@/shared/api/projectApi";
import { useQuery } from "@tanstack/react-query";

interface SettingsPanelProps {
  projectId?: number;
  onOpenPanel?: (panel: "todo") => void;
}

export function SettingsPanel({ projectId: propProjectId, onOpenPanel }: SettingsPanelProps) {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const user = authStore.user;
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'leave' | null>(null);

  const params = useParams<{ projectId: string }>();

  const projectId = propProjectId || Number(params.projectId) || 0;

  const leaveProjectMutation = useLeaveProjectFromEditor();
  const deleteProjectMutation = useDeleteProject();

  // 프로젝트 정보 가져오기
  const { data: projectData } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.getProject(projectId),
    enabled: !!projectId,
  });

  const canDelete = projectData?.data?.can_delete ?? false;
  const canLeave = projectData?.data?.can_leave ?? false;
  const canInvite = projectData?.data?.can_invite ?? false;

  const handleInvite = () => {
    setIsInviteModalOpen(true);
  };

  const handleSchedule = () => {
    if (onOpenPanel) {
      onOpenPanel("todo");
    }
  };

  const handleLeaveProject = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!canLeave) {
      alert("프로젝트 나가기 권한이 없습니다.");
      return;
    }


    setActionType('leave');
    setIsActionModalOpen(true);

  };

  const handleDeleteProject = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!projectId) {
      alert("프로젝트 정보를 찾을 수 없습니다");
      return;
    }

    if (!canDelete) {
      alert("프로젝트 삭제 권한이 없습니다.");
      return;
    }

    setActionType('delete');
    setIsActionModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (actionType === 'delete') {
      deleteProjectMutation.mutate(projectId, {
        onSuccess: () => {
          setIsActionModalOpen(false);
          setActionType(null);
        }
      });
    } else if (actionType === 'leave') {
      leaveProjectMutation.mutate(projectId, {
        onSuccess: () => {
          setIsActionModalOpen(false);
          setActionType(null);
        }
      });
    }
  };

  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      try {
        await authApi.logout();
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        authStore.logout();
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#1f1f1f] text-gray-100">
      {/* 헤더 */}
      <div className="h-10 flex items-center border-b border-gray-700 px-3">
        <h2 className="text-sm font-semibold">설정</h2>
      </div>

      {/* 본문 */}
      <div className="flex flex-1 flex-col items-center px-4 text-center">
        {/* 상단 영역 (로고 + 인사) */}
        <div className="mt-14 flex flex-col items-center">
          <h1
            className="mb-6 text-3xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => navigate('/projects')}
          >
            EditUs
          </h1>

          <p className="text-sm leading-relaxed">
            <span className="font-semibold">{user?.name || "사용자"}님,</span>
            <br />
            안녕하세요.
          </p>
        </div>

        {/* 메뉴 영역 */}
        <div className="mt-14 flex flex-col gap-4 text-xs text-gray-300">
          {/* 프로젝트 나가기 - 팀장 제외 */}
          {canLeave && (
            <button
              onClick={handleLeaveProject}
              className="hover:text-white"
            >
              프로젝트 나가기
            </button>
          )}

          {/* 프로젝트 삭제 - 팀장만 */}
          {canDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                handleDeleteProject(e);
              }}
              className="hover:text-red-400 text-red-500"
            >
              프로젝트 삭제
            </button>
          )}

          {canInvite && (
            <button
              onClick={handleInvite}
              className="hover:text-white"
            >
              프로젝트 초대하기
            </button>
          )}

          <button
            onClick={handleSchedule}
            className="hover:text-white"
          >
            일정
          </button>
        </div>
      </div>

      {/* 로그아웃 */}
      <button
        onClick={handleLogout}
        className="py-4 text-xs text-gray-400 hover:text-white"
      >
        로그아웃
      </button>

      {/* 초대 모달 */}
      {isInviteModalOpen && (
        <InviteMemberModal
          projectId={projectId || 1}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}

      {/* 삭제/나가기 모달 */}
      <DeleteProjectModal
        isOpen={isActionModalOpen}
        onClose={() => {
          setIsActionModalOpen(false);
          setActionType(null);
        }}
        onConfirm={handleConfirmAction}
        isLoading={deleteProjectMutation.isPending || leaveProjectMutation.isPending}
        projectName={projectData?.data?.name}
        isDelete={actionType === 'delete'}
      />
    </div>
  );
}
