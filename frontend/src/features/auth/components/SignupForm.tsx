import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

export const SignupForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-[2rem] shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-black">회원가입</h2>
          <p className="mt-2 text-gray-500 text-sm">EditUs와 함께 개발을 시작해보세요</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <Input 
              label="이름" 
              type="text" 
              placeholder="홍길동" 
            />
            <Input 
              label="이메일" 
              type="email" 
              placeholder="name@example.com" 
            />
            <Input 
              label="비밀번호" 
              type="password" 
              placeholder="8자 이상 입력해주세요" 
            />
            <Input 
              label="비밀번호 확인" 
              type="password" 
              placeholder="비밀번호를 다시 입력해주세요" 
            />
          </div>

          <Button fullWidth type="submit">
            가입하기
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
