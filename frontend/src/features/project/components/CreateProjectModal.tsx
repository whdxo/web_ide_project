import React, { useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useCreateProject } from '../hooks/useCreateProject';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const { mutate: createProject, isPending } = useCreateProject();
  const { user } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    projectType: 'PERSONAL' | 'TEAM';
  }>({
    name: '',
    description: '',
    projectType: 'TEAM'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    createProject({
      name: formData.name,
      description: formData.description,
      project_type: formData.projectType,
      owner_id: user.userId
    }, {
      onSuccess: () => {
        setFormData({
          name: '',
          description: '',
          projectType: 'TEAM'
        });
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="새 프로젝트 생성">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="프로젝트 이름"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="프로젝트 이름을 입력하세요"
          required
        />
        
        <Input
          label="설명"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="프로젝트 설명을 입력하세요"
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? '생성 중...' : '생성하기'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
