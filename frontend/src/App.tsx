<<<<<<< HEAD
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './features/auth/components/LoginForm';
import { SignupForm } from './features/auth/components/SignupForm';
>>>>>>> frontend-integration

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditorPage } from './features/editor/components/EditorPage';


function App() {
<<<<<<< HEAD
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 페이지는 비워두고, editor 페이지만 연결 */}
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
=======
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> frontend-integration
}

export default App;
