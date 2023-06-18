import React from 'react'
import logo from '../assets/images/logo-new.png'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <ul id="nav-bar">
      <div id="nav-container">
        <li>
          <Link to='/'><img srcSet={logo} alt="" /></Link>
        </li>
        <li><Link to='/'>Home</Link></li>
        <li><a href="#find-freelancer">Find freelancers</a></li>
        <li>
          <Link to='/find-job'>Find job</Link>
        </li>
        <li>
          <Link to='/login'>Log in</Link>
        </li>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
      </div>
    </ul>
  )
}

export default NavBar