import React, { useContext } from 'react'
import logo from '../../assets/images/logo-new.png'
import { Link } from 'react-router-dom'
import { StyledNav } from './style'
import AuthContext from '../../context/AuthContext'

const NavBar = ({ notfixed }) => {

  const { userFirstName, logout } = useContext(AuthContext);

  return (
    <StyledNav id="nav-bar" $notfixed={notfixed}>
      <div id="nav-container">
        <li>
          <Link to='/'><img srcSet={logo} alt="" /></Link>
        </li>
        <li><Link to='/'>Home</Link></li>
        <li>
          <Link to='/find-job'>Find job</Link>
        </li>
        <li>
          <Link to='/create-post'>Add post</Link>
        </li>
        {userFirstName ? (<>
          <li>
            <button onClick={() => logout()}>Log out</button>
          </li>
          <li>
            {/* TODO: link the profile page */}
            <Link to='/personal_page'>{userFirstName}</Link>
          </li>
        </>) : (
          <>
            <li>
              <Link to='/login' state={{ isSignin: true }}>Log in</Link>
            </li>
            <li>
              <Link to='/signup' state={{ isSignin: false }}>Sign up</Link>
            </li>
          </>
        )
        }

      </div>
    </StyledNav>
  )
}

export default NavBar