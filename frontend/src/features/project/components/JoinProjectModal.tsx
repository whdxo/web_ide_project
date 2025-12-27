import React, { useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useProjectInvite } from '../hooks/useProjectInvite';

interface JoinProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinProjectModal = ({ isOpen, onClose }: JoinProjectModalProps) => {
  const { joinProject } = useProjectInvite();
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinProject.mutate(
      { inviteCode },
      {
        onSuccess: () => {
          setInviteCode('');
          onClose();
          alert('프로젝트에 성공적으로 참여했습니다!');
        },
        onError: () => {
          alert('초대 코드가 유효하지 않거나 만료되었습니다.');
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="프로젝트 참여">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="초대 코드"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="전달받은 초대 코드를 입력하세요"
          required
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" disabled={joinProject.isPending}>
            {joinProject.isPending ? '참여 중...' : '참여하기'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
