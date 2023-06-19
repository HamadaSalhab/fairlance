import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Signup/SignupPage';
import * as React from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
