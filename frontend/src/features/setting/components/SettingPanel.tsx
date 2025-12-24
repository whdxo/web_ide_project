import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useMembers, useRemoveMember } from "@/features/member/hooks/useMembers";
import { InviteMemberModal } from "@/features/member/components/InviteMembermodal";

interface SettingsPanelProps {
  projectId?: number;
  currentUserId?: number;
  onOpenPanel?: (panel: "todo") => void;
}

export function SettingsPanel({ projectId, currentUserId, onOpenPanel }: SettingsPanelProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  // 멤버 정보 가져오기
  const { data: members } = useMembers(projectId || 0);
  const removeMember = useRemoveMember(projectId || 0);
  
  // 내 멤버 정보
  const myMember = members?.find(m => m.user_id === currentUserId);

  const handleInvite = () => {
    setIsInviteModalOpen(true);
  };

  const handleSchedule = () => {
    if (onOpenPanel) {
      onOpenPanel("todo");
    }
  };

  const handleLeaveProject = () => {
    if (!confirm("정말 프로젝트를 나가시겠습니까?")) {
      return;
    }
    
    // 프로젝트 페이지로 바로 이동
    navigate("/projects");
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
          <button 
            onClick={handleLeaveProject}
            className="hover:text-white"
          >
            프로젝트 나가기
          </button>
          
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