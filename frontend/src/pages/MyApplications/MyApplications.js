import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Code } from 'react-content-loader';
import AuthContext from '../../context/AuthContext';
import { StyledLoading, StyledMyApplications } from './style';
import Footer from '../../components/Footer/Footer';
import MyApplication from '../../components/MyApplication/MyApplication';
import { useParams } from 'react-router-dom';
import Request from '../../utils/Request';

const MyApplications = () => {
  const { authToken } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const { userID } = useParams();

  useEffect(() => {
    fetch(`/api/users/${userID}/applications/`, Request('GET', '', authToken))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApplications(data);
      })
      .catch(() => {
        for (let i = 0; i < 3; i++) {
          setApplications([]);
        }
      });
  }, [setApplications, authToken, userID]);

  return (
    <div>
      <NavBar />
      <StyledMyApplications>
        {applications.length > 0 ? (
          applications.map((application, idx) => {
            return <MyApplication application={application} key={idx}></MyApplication>;
          })
        ) : (
          <StyledLoading className='loading-container'>
            <div>
              <Code className='loading' />
            </div>
            <div>
              <Code className='loading' />
            </div>
            <div>
              <Code className='loading' />
            </div>
            <div>
              <Code className='loading' />
            </div>
          </StyledLoading>
        )}
      </StyledMyApplications>
      <Footer />
    </div>
  );
};

export default MyApplications;
