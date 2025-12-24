// 초대 모달 (영선님이랑 상의해보기)
import { useState } from "react";
import { IoClose, IoCopy, IoCheckmark } from "react-icons/io5";
import { useCreateInviteCode } from "../hooks/useMembers";

interface InviteMemberModalProps {
  projectId: number;
  onClose: () => void;
}

export function InviteMemberModal({
  projectId,
  onClose,
}: InviteMemberModalProps) {
  const [copied, setCopied] = useState(false);
  const { data, isLoading } = useCreateInviteCode(projectId);

  const handleCopy = async () => {
    if (!data?.inviteCode) return;

    // 초대 링크 생성
    const inviteUrl = `${window.location.origin}/join?code=${data.inviteCode}`;

    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] rounded-lg w-96 border border-gray-800">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold">멤버 초대</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-800 text-gray-400"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* 내용 */}
        <div className="p-4 space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-500 text-sm py-8">
              초대 링크 생성 중...
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400">
                아래 링크를 복사하여 팀원에게 공유하세요
              </p>

              {/* 초대 코드 */}
              <div className="bg-gray-800 rounded p-3 flex items-center justify-between gap-2">
                <code className="text-xs text-green-400 flex-1 break-all">
                  {data?.inviteCode || "N/A"}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-white flex-shrink-0"
                >
                  {copied ? (
                    <IoCheckmark size={16} className="text-green-400" />
                  ) : (
                    <IoCopy size={16} />
                  )}
                </button>
              </div>

              {/* 만료 시간 */}
              {data?.expiresAt && (
                <p className="text-xs text-gray-500">
                  만료 시간: {new Date(data.expiresAt).toLocaleString("ko-KR")}
                </p>
              )}
            </>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}