// 개별 아이템
import { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { useRemoveMember } from "../hooks/useMembers";
import type { ProjectMember } from "@/shared/features-types/project.types";

interface MemberItemProps {
  member: ProjectMember;
  isCurrentUser: boolean;
  canDelete: boolean;
  projectId: number;
}

export function MemberItem({
  member,
  isCurrentUser,
  canDelete,
  projectId,
}: MemberItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const removeMember = useRemoveMember(projectId);

  const handleDelete = () => {
    if (!confirm("정말 이 멤버를 삭제하시겠습니까?")) return;

    setIsDeleting(true);
    removeMember.mutate(member.userId, {
      onSettled: () => setIsDeleting(false),
    });
  };



  return (
    <div className="group flex items-center justify-between p-3 hover:bg-gray-800/50">
      <div className="flex items-center gap-3">
        {/* 아바타 */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br bg-[#5363EE] flex items-center justify-center text-white font-semibold text-sm">
          {member.userId.toString().slice(0, 2)}
        </div>

        <div>
          {/* 사용자 이름 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-200">
              User {member.userId}
              {isCurrentUser && (
                <span className="text-xs text-gray-500 ml-1">(나)</span>
              )}
            </span>
            {member.isOwner && (
              <FaCrown className="text-yellow-400" size={14} />
            )}
          </div>

          {/* 역할 배지 - 단순히 팀장/멤버 구분 */}
          <span
            className={`text-xs px-2 py-0.5 rounded ${member.isOwner
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-gray-500/20 text-gray-400"
              }`}
          >
            {member.isOwner ? "팀장" : "멤버"}
          </span>
        </div>
      </div>

      {/* 삭제 버튼 (팀장만 + 본인 제외) */}
      {canDelete && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 p-2 rounded hover:bg-red-600/20 text-red-400 disabled:opacity-50"
          title="멤버 삭제"
        >
          <IoTrash size={16} />
        </button>
      )}
    </div>
  );
}