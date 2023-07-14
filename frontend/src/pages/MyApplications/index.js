import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { List } from 'react-content-loader';
import AuthContext from '../../context/AuthContext';
import { StyledMyApplications } from './style';
import Footer from '../../components/Footer';
import MyApplication from '../../components/MyApplication';
import { useParams } from 'react-router-dom';

const MyApplications = () => {
    const { authToken } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const { userID } = useParams();

    useEffect(() => {
        const req = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `token ${authToken}`,
                'ngrok-skip-browser-warning': 'true',
            },
        };
        fetch(`/api/users/${userID}/applications/`, req)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setApplications(data);
            })
            .catch((error) => {
                for (let i = 0; i < 3; i++) {
                    setApplications([]);
                }
                console.log(error);
            });
    }, [setApplications]);

    return (
        <div>
            <NavBar />
            <StyledMyApplications>
                {applications.length > 0 ? (
                    applications.map((application, idx) => {
                        console.log('Found applications)');
                        return <MyApplication application={application} key={idx}></MyApplication>;
                    })
                ) : (
                    <div className='loading-container'>
                        <List className='loading' />
                        <div className='seperate' style={{ margin: '2rem 0', width: '100%' }}></div>
                        <List className='loading' />
                        <div className='seperate' style={{ margin: '2rem 0', width: '100%' }}></div>
                        <List className='loading' />
                    </div>
                )}
            </StyledMyApplications>
            <Footer />
        </div>
    );
};

export default MyApplications;
