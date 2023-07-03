import React, { useEffect, useState } from 'react';
import Tags from '../Tags';
import { StyledDetailedPost } from './style';
import Button from '../Button';
import { Code } from 'react-content-loader';
import ApplicationForm from '../ApplicationForm';

const DetailedPost = ({ post }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const formatDate = (date) => {
    return date.toLocaleString();
  }
  return (
    post
      ?
      <>
        <StyledDetailedPost>
          <div>
            <h4>{post.first_name} {post.last_name}</h4>
            <div style={{ color: '#7b7b7b' }}> <i className="fa-regular fa-clock" style={{ padding: '0.4rem 0.4rem 0 0.4rem' }}></i>deadline {formatDate(new Date(post.deadline))}</div>
          </div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <Tags tags={post.skills || []} />
          <div className='price-info'>
            <div className="price-range">
              <div>{parseInt(post.price_min)} -</div>

              <div>{parseInt(post.price_max)} $</div>
            </div>
            {!showForm ? (
              <Button onClick={toggleForm}>Apply</Button>
            ) : (
              <Button onClick={toggleForm}>Close</Button>
            )}
          </div>
        </StyledDetailedPost>
        {showForm && <ApplicationForm projectId={post.id}/>}
      </>
      :
      <StyledDetailedPost>
        <Code />
      </StyledDetailedPost>
  )
}

export default DetailedPost