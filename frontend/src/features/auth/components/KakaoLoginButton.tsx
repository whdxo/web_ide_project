import { ENV } from '@/config/env';

export const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${ENV.API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full bg-[#FEE500] text-[#191919] py-2 px-4 rounded font-bold hover:bg-[#E6CF00] transition-colors flex items-center justify-center gap-2"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 3C5.373 3 0 7.063 0 12.076c0 3.057 1.993 5.784 5.003 7.36-.23.848-.836 3.064-.957 3.536-.15.58.214.57.45.375.186-.153 2.95-2.003 4.123-2.8.777.11 1.577.168 2.381.168 6.627 0 12-4.063 12-9.076C24 7.063 18.627 3 12 3z"/>
      </svg>
      카카오로 시작하기
    </button>
  );
};
