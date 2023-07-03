import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext';

const Application = () => {
    const { id } = useParams();
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        console.log(id);
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
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            div
        </div>
    )
}

export default Application