import React from 'react'
import logo from '../assets/images/logo-new.png'

const NavBar = () => {
  return (
    <ul id="nav-bar">
      <div id="nav-container">
        <li><a href="#home"><img srcSet={logo} alt="" /></a></li>
        <li><a href="#home" className='active'>Home</a></li>
        <li><a href="#find-freelancer">Find freelancers</a></li>
        <li><a href="#find-job">Find job</a></li>
        <li><a href="#log-in">Log in</a></li>
        <li><a href="sign-up">Sign up</a></li>
      </div>
    </ul>
  )
}

export default NavBar