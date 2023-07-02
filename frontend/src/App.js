import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import * as React from 'react';
import FindJobPage from './pages/FindJob';
import FAQ from './pages/FAQ';
import CreatePost from './pages/CreatePost';
import PostDetailsPage from './pages/PostDetails';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/faq' element={<FAQ />}></Route>
          <Route path='create-post' element={<PrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />}></Route>
          </Route>
          <Route path='/faq' element={<FAQ />} />
          {/* 
          TODO: add authentication to the following pages:
        */}
          <Route path='/find-job' element={<FindJobPage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path='/profile' element={<Profile />} />
      </Routes>
      </AuthProvider>
      <ToastContainer position='bottom-right' autoClose={2000} hideProgressBar={true} />
    </>
  );
}

export default App;
