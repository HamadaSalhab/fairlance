import React from 'react'
import './style.css'
import MainView from './Components/MainView.js'
import NavBar from '../Profile/Components/NavBar';

const Profile = () => {
  return (
    <div>
      <NavBar />
      <MainView />
    </div>
  )
}

export default Profile