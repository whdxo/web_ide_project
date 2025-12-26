import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { useSignup } from '../hooks/useSignup';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate: signup, isPending } = useSignup();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 길이 검증 (백엔드 요구사항: 4-20자)
    if (password.length < 4 || password.length > 20) {
      alert('비밀번호는 4자 이상 20자 이하여야 합니다.');
      return;
    }

    // 이름 길이 검증 (백엔드 요구사항: 2-50자)
    if (name.length < 2 || name.length > 50) {
      alert('이름은 2자 이상 50자 이하여야 합니다.');
      return;
    }

    signup({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-[2rem] shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-black">회원가입</h2>
          <p className="mt-2 text-gray-500 text-sm">EditUs와 함께 개발을 시작해보세요</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <Input
              label="이름"
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="이메일"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="4자 이상 20자 이하"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button fullWidth type="submit" disabled={isPending}>
            {isPending ? '가입 중...' : '가입하기'}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-brand-blue font-medium hover:underline">
              로그인
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
