import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext';
import Button from '../../Button';
import { Link } from 'react-router-dom';
import { StyledApplication } from '../style';
import NavBar from '../../NavBar';
import Footer from '../../Footer';

const Application = () => {
    const { projectid, id } = useParams();
    const { authToken } = useContext(AuthContext);
    const [application, setApplication] = useState();

    useEffect(() => {
        console.log(projectid);
        const req = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `token ${authToken}`,
                'ngrok-skip-browser-warning': 'true'
            }
        }
        fetch(`/api/application/retrieve/${id}/`, req)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setApplication(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <NavBar notfixed={true} />
            <div style={{ height: '60vh' }}>
                <StyledApplication>
                    {application && <>
                        <Link to={`/profile/${application.freelancer}`}>
                            <h4>{application.freelancer_first_name} {application.freelancer_last_name}</h4>
                        </Link>
                        <p>{application.proposal}</p>
                        <div className='price-info'>
                            <div className="price-range">
                                <div>{application.bid} $</div>
                            </div>
                            <Link to={`/post/${projectid}`}>
                                <Button>Return</Button>
                            </Link>
                            <Link to={`application/${application.id}`}>
                                <Button primary={true}>Hire</Button>
                            </Link>
                        </div></>
                    }
                </StyledApplication>
            </div>
            <Footer />
        </>
    )
}

export default Application