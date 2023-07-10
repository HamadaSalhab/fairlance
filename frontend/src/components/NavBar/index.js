import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo-new.png";
import { Link } from "react-router-dom";
import { StyledNav, Menu } from "./style";
import AuthContext from "../../context/AuthContext";

const NavBar = ({ notfixed }) => {
  const { userFirstName, logout } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);

  return (
    <StyledNav id="nav-bar" $notfixed={notfixed}>
      <div id="nav-container">
        <li>
          <Link to="/">
            <img srcSet={logo} alt="" />
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/find-job" state={"/find-job"}>
            Find job
          </Link>
        </li>
        <li>
          <Link to="/create-post" state={"/create-post"}>
            Add job
          </Link>
        </li>
        {userFirstName ? (
          <>
            <li>
              Balance ${balance.toFixed(2)}
            </li>
            <li>
              <Menu>
                <div className="dropdown">
                  <a href="#" className="dropbtn">
                    Profile Menu <i className="fa-solid fa-caret-down"></i>
                  </a>
                  <div className="dropdown-content">
                    <li>
                      <Link to={`/users/${userID}/applications`}>My Applications</Link>
                    </li>
                    <li>
                      <Link to={`/offers`}>My offers</Link>
                    </li>
                    <li>
                      <Link to={`/profile/${userID}`}>My profile</Link>
                    </li>
                    <li>
                      <button onClick={() => logout()}>Log out</button>
                    </li>
                  </div>
                </div>
              </Menu>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" state={"/"}>
                Log in
              </Link>
            </li>
            <li>
              <Link to="/signup" state={"/"}>
                Sign up
              </Link>
            </li>
          </>
        )}
      </div>
    </StyledNav>
  );
};

export default NavBar;
