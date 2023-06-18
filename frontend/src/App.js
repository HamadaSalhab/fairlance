import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Signup/SignupPage';
import * as React from 'react';
import FindJobPage from './pages/FindJob/FindJobPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        {/* 
          TODO: add authentication to the following pages:
        */}
        <Route path='/find-job' element={<FindJobPage />} />
      </Routes>
    </>
  );
}

export default App;
