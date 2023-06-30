import React, { useContext, useEffect, useState } from 'react'
import Post from '../../../components/Post';
import { StyledPosts } from '../styles';
import AuthContext from '../../../context/AuthContext';

const Posts = ({ URL }) => {

    const { authToken } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

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
        fetch('/api/projects/', req)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPosts(data);
            })
            .catch((error) => {
                for (let i = 0; i < 3; i++) {
                    setPosts([])
                }
                console.log(error);
            })
    }, [setPosts, URL]);

    return (
        <StyledPosts>
            {
                posts.map((post, idx) => {
                    return (
                        <Post post={post} key={idx}>
                        </Post>
                    );
                }
                )
            }
        </StyledPosts>
    );
};

export default Posts