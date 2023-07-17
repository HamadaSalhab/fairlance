import React from 'react';
import { StyledOffer } from '../style';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';

const Offer = ({ owner, project, projectid, noOffer, idx }) => {
  return (
    <StyledOffer>
      {!noOffer ? (
        <>
        <h2>Offer #{idx+1}</h2>
          <p>
            You got offer from {owner} on <Link to={`/post/${projectid}`}>{project}</Link> project
          </p>
          <div className='options'>
            <Button>Decline</Button>
            <Button primary={true}>Accept</Button>
          </div>
        </>
      ) : (
        <p>You don't have offers yet, we will notify you as soon as you get a new offer</p>
      )}
    </StyledOffer>
  );
};

export default Offer;
