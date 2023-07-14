import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import Button from '../../Button';
import { Link } from 'react-router-dom';
import { StyledApplication } from '../style';
import NavBar from '../../NavBar';
import Footer from '../../Footer';
import { toast } from 'react-toastify';

const Application = () => {
  const { projectid, id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [application, setApplication] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(projectid);
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true',
      },
    };
    fetch(`/api/application/${id}/`, req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setApplication(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hire = () => {
    // TODO: implement hiring
    console.log(id);
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        application: id,
      }),
    };
    fetch('/api/offers/create/', req)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    toast(
      'You have succesffully hired the freelancer. We will tell you when the client accepts your offer',
    );
    navigate(`/post/${projectid}`);
  };

  return (
    <>
      <NavBar notfixed={true} />
      <div style={{ height: '60vh' }}>
        <StyledApplication>
          {application && (
            <>
              <Link to={`/profile/${application.freelancer}`}>
                <h4>
                  {application.freelancer_first_name} {application.freelancer_last_name}
                </h4>
              </Link>
              <p>{application.proposal}</p>
              <div className='price-info'>
                <div className='price-range'>
                  <div>{application.bid} $</div>
                </div>
                <Link to={`/post/${projectid}`}>
                  <Button>Return</Button>
                </Link>
                <Button primary={true} onClick={hire}>
                  Hire
                </Button>
              </div>
            </>
          )}
        </StyledApplication>
      </div>
      <Footer />
    </>
  );
};

export default Application;
