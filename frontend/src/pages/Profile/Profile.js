import React from 'react'
import './style.js'
import NavBar from '../Profile/Components/NavBar';
import MainView from './Components/MainView.js'
import Footer from '../../components/Footer';

const Profile = () => {
  return (
    <div>
      <NavBar/>
      <MainView/>
      <Footer/>
    </div>
  )
}

export default Profile