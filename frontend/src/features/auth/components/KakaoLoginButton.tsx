import React from 'react';

export const KakaoLoginButton = () => {
  const handleLogin = () => {
    // Handle Kakao login logic
    console.log('Kakao login clicked');
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-[#FEE500] text-[#191919] py-2 px-4 rounded font-bold hover:bg-[#E6CF00] transition-colors"
    >
      카카오로 시작하기
    </button>
  );
};
