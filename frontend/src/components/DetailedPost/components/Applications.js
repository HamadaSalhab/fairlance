import React, { useContext, useEffect, useState } from 'react'
import { StyledApplications } from '../style'
import AuthContext from '../../../context/AuthContext'
import Button from '../../Button'
import { Link } from 'react-router-dom'
import EmptyApplication from './EmptyApplication'
import { List } from 'react-content-loader';

const Applications = ({ id }) => {

    const { authToken } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const req = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `token ${authToken}`,
                'ngrok-skip-browser-warning': 'true'
            }
        }
        const load = async () => {
            await fetch(`/api/application/list/${id}/`, req)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data);
                    setApplications(data);
                })
                .catch((error) => {
                    console.log(error);
                })
            setLoading(false);
        }
        load()
    }, []);

    return (
        <StyledApplications>
            <h3>
                Applications:
            </h3>
            {applications.length === 0 && !loading && <EmptyApplication />}
            {loading && <List className='loading'/>}
            {applications.map((application, idx) => {
                console.log(application);
                return (
                    <div key={idx}>
                        <Link to={`/profile/${application.freelancer}`}>
                            <h4>{application.freelancer_first_name} {application.freelancer_last_name}</h4>
                        </Link>
                        <p>{application.proposal}</p>
                        <div className='price-info'>
                            <div className="price-range">
                                <div>{application.bid} $</div>
                            </div>
                            <Link to={`application/${application.id}`}>
                                <Button primary={true}>View proposal</Button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </StyledApplications>
    )
}

export default Applications