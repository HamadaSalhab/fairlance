import React, { useEffect, useState } from 'react'
import Post from './Post'
import { StyledPosts } from '../styles';

const Posts = ({ URL }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(URL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPosts(data)
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
                posts.map((post,idx) => {
                    return <Post post={post} key={idx} />
                })
            }
        </StyledPosts>
    )
}

export default Posts