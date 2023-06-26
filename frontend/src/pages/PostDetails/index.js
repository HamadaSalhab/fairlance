import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailedPost from '../../components/DetailedPost';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { StyledPostDetailsComponent } from './style';
const PostDetailsPage = () => {
    const { id } = useParams(); // Access the "id" parameter from the URL
    const [post, setPost] = useState();
    const URL = "http://localhost:3030/posts/" + id;

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                setPost(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, URL]);

    useEffect(() => {
        console.log('post:', post);
    }, [post]);

    return (
        <div>
            <NavBar />
            <StyledPostDetailsComponent>
                {post && <DetailedPost post={post} />}
            </StyledPostDetailsComponent>
            <Footer />
        </div>
    );
};

export default PostDetailsPage;
