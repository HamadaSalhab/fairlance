import React, { useContext, useEffect, useState } from 'react';
import Post from '../../../components/Post';
import { StyledPosts } from '../styles';
import AuthContext from '../../../context/AuthContext';
import { List } from 'react-content-loader';

const Posts = () => {
  const { authToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const load = async () => {
      await fetch('/api/projects/', req)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => {
          for (let i = 0; i < 3; i++) {
            setPosts([]);
          }
          console.log(error);
        });
      setLoading(false);
    };
    load();
  }, [setPosts]);

  return (
    <StyledPosts>
      {posts.length > 0 ? (
        posts.map((post, idx) => {
          return <Post post={post} key={idx}></Post>;
        })
      ) : (
        <>
          {loading ? (
            <div className='loading-container'>
              <List className='loading' />
              <div className='seperate' style={{ margin: '2rem 0', width: '100%' }}></div>
              <List className='loading' />
              <div className='seperate' style={{ margin: '2rem 0', width: '100%' }}></div>
              <List className='loading' />
            </div>
          ) : (
            <div style={{ padding: '1rem' }}>There are not posts yet</div>
          )}
        </>
      )}
    </StyledPosts>
  );
};

export default Posts;
