import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Signup/SignupPage';
import * as React from 'react';
import FindJobPage from './pages/FindJob';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
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
