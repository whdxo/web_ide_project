// 목록
import { MemberItem } from "./MemberItem";
import type { ProjectMember } from "@/shared/features-types/project.types";

interface MemberListProps {
  members: ProjectMember[];
  currentUserId: number;
  isOwner: boolean;
  projectId: number;
}

export function MemberList({
  members,
  currentUserId,
  isOwner,
  projectId,
}: MemberListProps) {
  // 팀장을 맨 위로, 나머지는 이름순 정렬
  const sortedMembers = [...members].sort((a, b) => {
    if (a.role === "OWNER") return -1;
    if (b.role === "OWNER") return 1;
    return 0;
  });

  return (
    <div className="divide-y divide-gray-800">
      {sortedMembers.map((member) => (
        <MemberItem
          key={member.member_id}
          member={member}
          isCurrentUser={member.user_id === currentUserId}
          canDelete={isOwner && member.user_id !== currentUserId}
          projectId={projectId}
        />
      ))}
    </div>
  );
}