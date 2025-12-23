// 메인 패널
import { useState } from "react";
import { useMembers } from "../hooks/useMembers";
import { MemberList } from "./MemberList";
import { InviteMemberModal } from "./InviteMemberModal";
import { IoPersonAdd } from "react-icons/io5";

interface MemberPanelProps {
  projectId: number;
  currentUserId: number;
}

export function MemberPanel({ projectId, currentUserId }: MemberPanelProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { data, isLoading, error } = useMembers(projectId);

  // 현재 사용자가 팀장인지 확인
  const currentUserMember = data?.find((m) => m.user_id === currentUserId);
  const isOwner = currentUserMember?.role === "OWNER";

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-sm">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 text-sm">
        멤버 목록을 불러올 수 없습니다
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#1f1f1f]">
      {/* 헤더 */}
      <div className="h-10 flex items-center border-b border-gray-700 px-3">
        <h2 className="text-sm font-semibold">프로젝트 멤버</h2>
      </div>

      {/* 멤버 목록 */}
      <div className="flex-1 overflow-y-auto">
        <MemberList
          members={data || []}
          currentUserId={currentUserId}
          isOwner={isOwner}
          projectId={projectId}
        />
      </div>

      {/* 멤버 수 + 초대 버튼 */}
      <div className="flex items-center justify-between p-3 border-t border-gray-800">
        <span className="text-xs text-gray-500">
          총 {data?.length || 0}명의 멤버
        </span>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="p-2 rounded hover:bg-gray-700 text-gray-400"
          title="멤버 초대"
        >
          <IoPersonAdd size={18} />
        </button>
      </div>

      {/* 초대 모달 */}
      {isInviteModalOpen && (
        <InviteMemberModal
          projectId={projectId}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}
    </div>
  );
}