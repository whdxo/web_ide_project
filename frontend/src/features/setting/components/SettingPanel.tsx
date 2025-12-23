import { useAuthStore } from "@/features/auth/store/authStore";

export function SettingsPanel() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex h-full flex-col bg-[#1f1f1f] text-gray-100">
      {/* 헤더 */}
      <div className="h-10 flex items-center border-b border-gray-700 px-3">
        <h2 className="text-sm font-semibold">설정</h2>
      </div>

      {/* 본문 */}
      <div className="flex flex-1 flex-col items-center px-4 text-center">
        {/* 🔹 상단 영역 (로고 + 인사) */}
        <div className="mt-14 flex flex-col items-center">
          <h1 className="mb-6 text-3xl font-bold">EditUs</h1>

          <p className="text-sm leading-relaxed">
            <span className="font-semibold">{user?.name}님,</span>
            <br />
            안녕하세요.
          </p>
        </div>

        {/* 🔹 메뉴 영역 (거리 확보 핵심) */}
        <div className="mt-14 flex flex-col gap-4 text-xs text-gray-300">
          <button className="hover:text-white">받은 초대장</button>
          <button className="hover:text-white">프로젝트 초대하기</button>
          <button className="hover:text-white">체크리스트</button>
          <button className="hover:text-white">일정</button>
        </div>
      </div>

      {/* 로그아웃 */}
      <button className="py-4 text-xs text-gray-400 hover:text-white">
        로그아웃
      </button>
    </div>
  );
}
