import React from 'react'
import logo from '../../../assets/images/logo-new.png'
import { Link } from 'react-router-dom'
import { StyledNav } from '../../../components/NavBar/style.js'

const NavBar = () => {
  return (
    <StyledNav id="nav-bar">
      <div id="nav-container">
        <li>
          <Link to='/'><img srcSet={logo} alt="" /></Link>
        </li>
        <li><Link to='/'>Home</Link></li>
        <li>
          <p id = 'profile-fullname'>Fullname</p>
        </li>
      </div>
    </StyledNav>
  )
}

export default NavBar