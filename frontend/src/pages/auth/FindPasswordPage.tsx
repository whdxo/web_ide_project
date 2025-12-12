import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function FindPasswordPage() {
  const navigate = useNavigate();

  const handleFindPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Find password attempt");
    // TODO: Implement actual find password logic (e.g., send email)
    alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            비밀번호 찾기
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            가입하신 이메일을 입력하시면<br />비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleFindPassword}>
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
          </div>

          <Button type="submit" className="w-full mt-6" size="lg">
            이메일 전송
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link to="/login" className="font-medium text-brand-blue hover:text-brand-blue-light">
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
