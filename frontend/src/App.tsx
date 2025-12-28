import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './features/auth/components/LoginForm';
import { SignupForm } from './features/auth/components/SignupForm';
import { ForgotPasswordPage } from './features/auth/components/ForgotPasswordPage';
import { OAuthCallback } from './features/auth/components/OAuthCallback';
import { ProjectSelectionPage } from './features/project/components/ProjectSelectionPage';
import { EditorPage } from './features/editor/components/EditorPage';
import { ProtectedRoute } from './shared/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        {/* 보호된 라우트 - 인증 필요 */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
