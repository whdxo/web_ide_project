import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  userName?: string;
  onLogout?: () => void;
}

export const Sidebar = ({ userName = '영선', onLogout }: SidebarProps) => {
  const menuItems = [
    { label: '받은 초대장', href: '#' },
    { label: '프로젝트 초대하기', href: '#' },
    { label: '체크리스트', href: '#' },
    { label: '일정', href: '#' },
  ];

  return (
    <aside className="w-64 bg-white h-screen flex flex-col p-8 border-r border-gray-200 fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-black">EditUs</h1>
      </div>

      {/* Greeting */}
      <div className="mb-12">
        <p className="text-xl font-bold text-gray-800 leading-relaxed">
          {userName}님,<br />
          안녕하세요.
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href} 
                className="text-gray-600 hover:text-black font-medium text-sm transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button 
          onClick={onLogout}
          className="text-gray-500 hover:text-black text-sm font-medium transition-colors"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
};
