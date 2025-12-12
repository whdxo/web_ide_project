import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import FindPasswordPage from './pages/auth/FindPasswordPage';

// Placeholder for Projects Page
const ProjectsPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">내 프로젝트</h1>
    <p className="mt-4">프로젝트 목록이 여기에 표시됩니다.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
