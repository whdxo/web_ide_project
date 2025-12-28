// 초대 모달
import { useState, useLayoutEffect } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import { useCreateInviteCode } from "../hooks/useMembers";
import { Modal } from "@/shared/components/Modal";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";

interface InviteMemberModalProps {
  projectId: number;
  onClose: () => void;
}

export function InviteMemberModal({
  projectId,
  onClose,
}: InviteMemberModalProps) {
  const [copied, setCopied] = useState(false);
  const { data, isLoading, refetch } = useCreateInviteCode(projectId);

  // 모달이 열릴 때마다 새로운 코드를 확인/생성하기 위해 refetch
  // (useCreateInviteCode가 staleTime: 0이라도 캐시된 데이터를 사용할 수 있으므로 강제)
  useLayoutEffect(() => {
    refetch();
  }, [refetch]);

  const inviteCode = data?.code || "";
  const inviteUrl = inviteCode ? `${window.location.origin}/join?code=${inviteCode}` : "";

  const handleCopy = async () => {
    if (!inviteUrl) return;

    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="멤버 초대">
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center text-gray-500 text-sm py-8">
            초대 링크 생성 중...
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                초대 링크를 복사하여 팀원에게 공유하세요. 링크를 통해 프로젝트에 바로 참여할 수 있습니다.
              </p>

              <div className="relative">
                <Input
                  label="초대 링크"
                  value={inviteUrl}
                  readOnly
                  placeholder="초대 링크가 생성되지 않았습니다."
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-2 bottom-2 p-2 rounded-md hover:bg-gray-700 text-gray-400 transition-colors"
                  title="링크 복사"
                >
                  {copied ? (
                    <IoCheckmark size={20} className="text-green-500" />
                  ) : (
                    <IoCopyOutline size={20} />
                  )}
                </button>
              </div>

              {data?.expiresAt && (
                <p className="text-xs text-gray-500 text-right">
                  만료 시간: {new Date(data.expiresAt).toLocaleString("ko-KR")}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={onClose} variant="primary">
                확인
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
