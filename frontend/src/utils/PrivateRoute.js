import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    useEffect(() => {
        console.log(user);
    }, []);
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute