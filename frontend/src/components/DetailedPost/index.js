import React from 'react';
import Tags from '../Tags';
import { StyledDetailedPost } from './style';
import Button from '../Button';

const DetailedPost = ({ post }) => {
    return (
        <StyledDetailedPost>
            <div>
                <h4>{post.owner}</h4>
                <div style={{ color: '#7b7b7b' }}> <i className="fa-regular fa-clock" style={{ padding: '0.4rem 0.4rem 0 0.4rem' }}></i> {post.deadline} left</div>
            </div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <Tags tags={post.tags} />
            <div>
                <div className="price-range">
                    <div>{post.price_range_min} -</div>

                    <div>{post.price_range_max}</div>
                </div>
                <Button>Apply</Button>
            </div>
        </StyledDetailedPost>
    )
}

export default DetailedPost