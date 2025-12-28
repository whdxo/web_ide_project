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

    // URL이 입력된 경우 code 파라미터만 추출
    let code = inviteCode.trim();
    try {
      if (code.includes('http://') || code.includes('https://')) {
        const url = new URL(code);
        const codeParam = url.searchParams.get('code');
        if (codeParam) {
          code = codeParam;
        }
      } else if (code.includes('?code=')) {
        // 상대 경로 URL인 경우 (예: /join?code=xxx)
        const codeParam = code.split('?code=')[1]?.split('&')[0];
        if (codeParam) {
          code = codeParam;
        }
      }
    } catch (err) {
      // URL 파싱 실패 시 원본 사용
    }

    joinProject.mutate(
      { inviteCode: code },
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
