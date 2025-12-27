import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useMembers, useRemoveMember } from "@/features/member/hooks/useMembers";
import { useDeleteProject } from "@/features/project/hooks/useProjects";
import { InviteMemberModal } from "@/features/member/components/InviteMemberModal";

interface SettingsPanelProps {
  projectId?: number;
  currentUserId?: number;
  onOpenPanel?: (panel: "todo") => void;
}

export function SettingsPanel({ projectId: propProjectId, currentUserId: propCurrentUserId, onOpenPanel }: SettingsPanelProps) {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const user = authStore.user;
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const params = useParams<{ projectId: string }>();
  
  const projectId = propProjectId || Number(params.projectId) || 0;
  const currentUserId = propCurrentUserId || user?.userId || user?.id || 0;
  
  // 멤버 정보 가져오기
  const { data: members } = useMembers(projectId);
  const removeMember = useRemoveMember(projectId);
  const deleteProject = useDeleteProject();

  // 내 멤버 정보
  const myMember = members?.find(m => m.user_id === currentUserId);
  
  // 팀장 여부 확인 (OWNER 역할)
  const isOwner = myMember?.role === "OWNER";

  const handleInvite = () => {
    setIsInviteModalOpen(true);
  };

  const handleSchedule = () => {
    if (onOpenPanel) {
      onOpenPanel("todo");
    }
  };

  const handleLeaveProject = () => {
    if (!myMember) {
      alert("멤버 정보를 찾을 수 없습니다");
      return;
    }

    if (myMember.role === "OWNER") {
      alert("팀장은 프로젝트를 나갈 수 없습니다.\n다른 멤버에게 팀장을 양도하거나 프로젝트를 삭제해주세요.");
      return;
    }

    if (!confirm("정말 프로젝트를 나가시겠습니까?")) {
      return;
    }

    removeMember.mutate(myMember.member_id, {
      onSuccess: () => {
        alert("프로젝트에서 나갔습니다");
        navigate("/projects");
      },
      onError: (error) => {
        console.error("프로젝트 나가기 실패:", error);
        alert("프로젝트 나가기에 실패했습니다");
      }
    });
  };

  const handleDeleteProject = () => {
    if (!projectId) {
      alert("프로젝트 정보를 찾을 수 없습니다");
      return;
    }

    const confirmed = confirm(
      "⚠️ 프로젝트를 삭제하시겠습니까?\n\n" +
      "프로젝트의 모든 데이터(파일, 코드, 채팅 등)가 영구적으로 삭제됩니다.\n" +
      "이 작업은 되돌릴 수 없습니다."
    );

    if (!confirmed) return;

    const doubleConfirmed = confirm(
      "정말로 삭제하시겠습니까?\n프로젝트명을 확인해주세요."
    );

    if (!doubleConfirmed) return;

    deleteProject.mutate(projectId, {
      onSuccess: () => {
        alert("프로젝트가 삭제되었습니다");
        navigate("/projects");
      },
      onError: (error) => {
        console.error("프로젝트 삭제 실패:", error);
        alert("프로젝트 삭제에 실패했습니다");
      }
    });
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
          <h1 className="mb-6 text-3xl font-bold">EditUs</h1>

          <p className="text-sm leading-relaxed">
            <span className="font-semibold">{user?.name || "사용자"}님,</span>
            <br />
            안녕하세요.
          </p>
        </div>

        {/* 메뉴 영역 */}
        <div className="mt-14 flex flex-col gap-4 text-xs text-gray-300">
          {/* 프로젝트 나가기 - 팀장 제외 */}
          {!isOwner && (
            <button 
              onClick={handleLeaveProject}
              className="hover:text-white"
            >
              프로젝트 나가기
            </button>
          )}
          
          {/* 프로젝트 삭제 - 팀장만 */}
          {isOwner && (
            <button 
              onClick={handleDeleteProject}
              className="hover:text-red-400 text-red-500"
            >
              프로젝트 삭제
            </button>
          )}
          
          <button 
            onClick={handleInvite}
            className="hover:text-white"
          >
            프로젝트 초대하기
          </button>
          
          <button 
            onClick={handleSchedule}
            className="hover:text-white"
          >
            일정
          </button>
        </div>
      </div>

      {/* 로그아웃 */}
      <button className="py-4 text-xs text-gray-400 hover:text-white">
        로그아웃
      </button>

      {/* 초대 모달 */}
      {isInviteModalOpen && (
        <InviteMemberModal
          projectId={projectId || 1}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}
    </div>
  );
}