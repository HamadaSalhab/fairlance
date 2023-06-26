import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import * as React from 'react';
import FindJobPage from './pages/FindJob';
import FAQ from './pages/FAQ';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/faq' element={<FAQ />}></Route>
        <Route path='/create-post' element={<CreatePost />}></Route>
        {/* 
          TODO: add authentication to the following pages:
        */}
        <Route path='/find-job' element={<FindJobPage />} />
      </Routes>
    </>
  );
}

export default App;
