import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import SignIn from './pages/Sign In/SignIn';
import SignUp from './pages/Sign Up/SignUp';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
