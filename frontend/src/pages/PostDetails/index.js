import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailedPost from '../../components/DetailedPost';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { StyledPostDetailsComponent } from './style';
import AuthContext from '../../context/AuthContext';

const PostDetailsPage = () => {
    const { authToken } = useContext(AuthContext);
    const { id } = useParams(); // Access the "id" parameter from the URL
    const [post, setPost] = useState();

    useEffect(() => {
        const retrieve = async () => {
            const req = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `token ${authToken}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            }
            try {
                const res = await fetch(`/api/projects/${id}/`, req);
                console.log(res);
                const ret = await res.json();
                console.log(ret);
                if (res.ok) {
                    setPost(ret);
                }
            }
            catch (e) {
                console.log('error ' + e);
            }
        }
        retrieve();
    }, [id]);


    useEffect(() => {
        console.log('post:', post);
    }, [post]);

    return (
        <div>
            <NavBar />
            <StyledPostDetailsComponent>
                <DetailedPost post={post} />
            </StyledPostDetailsComponent>
            <Footer />
        </div>
    );
};

export default PostDetailsPage;
