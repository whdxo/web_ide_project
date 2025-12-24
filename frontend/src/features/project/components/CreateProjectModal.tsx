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
    projectType: 'PERSONAL'
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
          projectType: 'PERSONAL'
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">프로젝트 유형</label>
          <div className="flex space-x-4">
            <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${formData.projectType === 'PERSONAL' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="projectType"
                  value="PERSONAL"
                  checked={formData.projectType === 'PERSONAL'}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value as 'PERSONAL' | 'TEAM' })}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <div>
                  <span className="block text-sm font-medium text-gray-900">개인 프로젝트</span>
                  <span className="block text-xs text-gray-500 mt-1">혼자서 작업하는 프로젝트입니다.</span>
                </div>
              </div>
            </label>

            <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${formData.projectType === 'TEAM' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="projectType"
                  value="TEAM"
                  checked={formData.projectType === 'TEAM'}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value as 'PERSONAL' | 'TEAM' })}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <div>
                  <span className="block text-sm font-medium text-gray-900">팀 프로젝트</span>
                  <span className="block text-xs text-gray-500 mt-1">팀원들과 함께 협업합니다.</span>
                </div>
              </div>
            </label>
          </div>
        </div>

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
