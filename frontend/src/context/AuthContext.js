import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const notify = (msg) => toast(msg);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null);
    // TODO: find a better way to get the user (JWT maybe)
    const [user, setUser] = useState(() => localStorage.getItem('userName') && localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('userName')) : null);
    const navigate = useNavigate();
    const registerUser = async (data) => {
        console.log(data)
        try {
            const req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    'username': data.email,
                    'password': data.password
                }),
            };
            console.log(req);
            const res = await fetch('/api/users/', req);
            let ret = await res.json();
            console.log(ret);
            navigate('/login');
        }
        catch (e) {
            console.log(e);
        }
    }
    const loginUser = async (data) => {
        console.log(data);
        try {
            const req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    'username': data.email,
                    'password': data.password
                })
            }
            const res = await fetch('/api/users/auth/', req);
            console.log(res);
            let ret = await res.json();
            console.log(ret);
            if (res.status === 200) {
                setAuthToken(ret.token);
                setUser(data.email);
                localStorage.setItem('authToken', JSON.stringify(ret.token));
                localStorage.setItem('userName', JSON.stringify(data.email));
                console.log(data);
                notify(`Welcome back ${data.email}`);
                navigate('/');
            }
            else {
                console.log(ret['non_field_errors']);
                if (ret['non_field_errors'] && ret['non_field_errors'][0] == "Unable to log in with provided credentials.") {
                    toast.error(`Sorry you provided wrong email or passowrd, try again`);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
    }
    let contextData = {
        loginUser: loginUser,
        registerUser: registerUser,
        logout: logout,
        user: user,
        authToken: authToken
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}