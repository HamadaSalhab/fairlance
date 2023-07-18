import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const notify = (msg) => toast(msg);
  const { userFirstName } = useContext(AuthContext);
  const { state } = useLocation();
  useEffect(() => {
    if (!userFirstName) {
      notify('You need to login first');
    }
  }, [userFirstName]);
  return userFirstName ? <Outlet /> : <Navigate to='/login' state={state} />;
};

export default PrivateRoute;
