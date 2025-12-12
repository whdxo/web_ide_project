import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt");
    // TODO: Implement actual signup logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            EditUs와 함께 개발을 시작해보세요
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="이름"
              placeholder="홍길동"
            />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="이메일"
              placeholder="name@example.com"
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="비밀번호"
              placeholder="8자 이상 입력해주세요"
            />
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>

          <Button type="submit" className="w-full mt-6" size="lg">
            가입하기
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-500">이미 계정이 있으신가요? </span>
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
