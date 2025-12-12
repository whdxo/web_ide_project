import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { KakaoLoginButton } from './KakaoLoginButton';

export const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-[2rem] shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-black">EditUs</h2>
          <p className="mt-2 text-gray-500 text-sm">웹 기반 통합 개발 환경에 오신 것을 환영합니다</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <Input 
              label="이메일"
              type="email" 
              placeholder="name@example.com" 
            />
            <Input 
              label="비밀번호"
              type="password" 
              placeholder="비밀번호를 입력하세요" 
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <input type="checkbox" id="keep-logged-in" className="mr-2" />
              <label htmlFor="keep-logged-in" className="mb-0 cursor-pointer">
                로그인 유지
              </label>
            </div>
            <a href="#" className="text-brand-blue hover:underline">
              비밀번호 찾기
            </a>
          </div>

          <Button fullWidth type="submit">
            로그인
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <KakaoLoginButton />

          <p className="text-center text-sm text-gray-600 mt-4">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-brand-blue font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
