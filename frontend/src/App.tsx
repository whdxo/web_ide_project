import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './features/auth/components/LoginForm';
import { SignupForm } from './features/auth/components/SignupForm';
import { ForgotPasswordPage } from './features/auth/components/ForgotPasswordPage';
import { OAuthCallback } from './features/auth/components/OAuthCallback';
import { ProjectSelectionPage } from './features/project/components/ProjectSelectionPage';
import { EditorPage } from './features/editor/components/EditorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/projects" element={<ProjectSelectionPage />} />
        <Route path="/projects/:projectId/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
