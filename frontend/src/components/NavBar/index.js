import React from 'react'
import logo from '../../assets/images/logo-new.png'
import { Link } from 'react-router-dom'
import { StyledNav } from './style'

const NavBar = ({ notFixed }) => {
  return (
    <StyledNav id="nav-bar" notFixed={notFixed}>
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
    </StyledNav>
  )
}

export default NavBar