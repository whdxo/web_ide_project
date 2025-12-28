import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="h-12 border-b border-gray-800 bg-[#1f1f1f] flex items-center px-4">
      <div
        className="text-lg font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
        onClick={() => navigate('/projects')}
      >
        EditUs
      </div>
    </header>
  );
};
