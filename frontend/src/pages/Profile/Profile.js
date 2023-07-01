import React from 'react'
import './style.js'
import MainView from './Components/MainView.js'
import NavBar from '../Profile/Components/NavBar';

const Profile = () => {
  return (
    <div>
      <NavBar/>
      <MainView />
    </div>
  )
}

export default Profile