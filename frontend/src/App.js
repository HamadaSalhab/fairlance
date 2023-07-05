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

import Application from './components/DetailedPost/components/Application';
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
          <Route path='/create-post' element={<PrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />}></Route>
          </Route>
          <Route path='/faq' element={<FAQ />} />
          <Route path='/find-job' element={<PrivateRoute />}>
            <Route path='/find-job' element={<FindJobPage />}></Route>
          </Route>
          <Route path='/post/:id' element={<PrivateRoute />}>
            <Route path='/post/:id' element={<PostDetailsPage />}></Route>
          </Route>
          <Route path='/post/:projectid/application/:id' element={<PrivateRoute />}>
            <Route path='/post/:projectid/application/:id' element={<Application />}></Route>
          </Route>
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </AuthProvider>
      <ToastContainer position='bottom-right' autoClose={2000} hideProgressBar={true} />
    </>
  );
}

export default App;
