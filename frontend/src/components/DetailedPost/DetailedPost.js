import React, { useContext, useEffect, useState } from 'react';
import Tags from '../Tags/Tags';
import { StyledDetailedPost } from './style';
import Button from '../Button/Button';
import { Code } from 'react-content-loader';
import Applications from './components/Applications';
import ApplicationForm from '../ApplicationForm/ApplicationForm';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const DetailedPost = ({ post }) => {
  const [showForm, setShowForm] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const { userID } = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(userID);
    if (post && userID === post.owner) {
      setShowApplications(true);
      console.log('ok');
    }
  }, [post, userID]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const formatDate = (date) => {
    return date.toLocaleString();
  };
  return post ? (
    <div style={{ minHeight: '80vh' }}>
      <StyledDetailedPost>
      <h1>Post Details</h1>
        <div className='owner-and-deadline'>
          <Link to={`/profile/${post.owner}`}>
            <h4>
              Owner: {post.first_name} {post.last_name}
            </h4>
          </Link>
          <div style={{ color: '#7b7b7b' }}>
            <i className='fa-regular fa-clock' style={{ padding: '0.4rem 0.4rem 0 0.4rem' }}></i>
            Deadline: {formatDate(new Date(post.deadline))}
          </div>
        </div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <Tags tags={post.skills || []} />
        <div className='price-info'>
          <div className='price-range'>
            <div><div style={{fontWeight: 'bold', paddingRight: "0.5rem"}}>Price Range:</div> ${parseInt(post.price_min)}<div>-</div>{parseInt(post.price_max)}</div>
            </div>
          {!showApplications && (
            <>
              {!showForm ? (
                <Button onClick={toggleForm}>Apply</Button>
              ) : (
                <Button onClick={toggleForm}>Close</Button>
              )}
            </>
          )}
        </div>
      </StyledDetailedPost>
      {showForm && <ApplicationForm projectId={post.id} toggleForm={toggleForm} />}
      {showApplications && <Applications id={post.id} />}
    </div>
  ) : (
    <StyledDetailedPost>
      <Code />
    </StyledDetailedPost>
  );
};

export default DetailedPost;
