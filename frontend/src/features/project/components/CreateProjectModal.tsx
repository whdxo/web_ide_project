import React, { useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useCreateProject } from '../hooks/useCreateProject';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const { mutate: createProject, isPending } = useCreateProject();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: 'JAVA', // Default
    type: 'PERSONAL' as 'PERSONAL' | 'TEAM',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProject(formData, {
      onSuccess: () => {
        setFormData({
          name: '',
          description: '',
          language: 'JAVA',
          type: 'PERSONAL',
        });
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="새 프로젝트 생성">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="프로젝트 이름"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="프로젝트 이름을 입력하세요"
          required
        />
        
        <Input
          label="설명 (선택)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="프로젝트 설명을 입력하세요"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">언어</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          >
            <option value="JAVA">Java</option>
            <option value="PYTHON">Python</option>
            <option value="JAVASCRIPT">JavaScript</option>
            <option value="CPP">C++</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">프로젝트 유형</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="PERSONAL"
                checked={formData.type === 'PERSONAL'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'PERSONAL' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>개인 프로젝트</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="TEAM"
                checked={formData.type === 'TEAM'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'TEAM' })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>팀 프로젝트</span>
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
