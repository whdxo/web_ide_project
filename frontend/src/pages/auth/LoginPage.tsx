import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { MessageSquare } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt");
    // TODO: Implement actual login logic
    navigate('/projects');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            EditUs
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            웹 기반 통합 개발 환경에 오신 것을 환영합니다
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
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
              autoComplete="current-password"
              required
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                로그인 유지
              </label>
            </div>

            <div className="text-sm">
              <Link to="/find-password" className="font-medium text-brand-blue hover:text-brand-blue-light">
                비밀번호 찾기
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg">
              로그인
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">또는</span>
              </div>
            </div>

            <Button type="button" variant="kakao" className="w-full" size="lg">
              <MessageSquare className="mr-2 h-4 w-4 fill-current" />
              카카오로 시작하기
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-500">계정이 없으신가요? </span>
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
