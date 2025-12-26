import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { authApi } from '@/shared/api/authApi';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to request password reset:', error);
      alert('비밀번호 재설정 요청에 실패했습니다. 이메일을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-[2rem] shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-black">비밀번호 찾기</h2>
          <p className="mt-2 text-gray-500 text-sm">
            가입하신 이메일 주소를 입력하시면<br />
            비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
              이메일이 전송되었습니다.<br />
              메일함을 확인해주세요.
            </div>
            <Link to="/login">
              <Button fullWidth>로그인으로 돌아가기</Button>
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="이메일"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button fullWidth type="submit" disabled={isLoading}>
              {isLoading ? '전송 중...' : '재설정 링크 보내기'}
            </Button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-gray-600 hover:text-brand-black hover:underline">
                로그인으로 돌아가기
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
