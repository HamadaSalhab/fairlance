import React from 'react'
import Button from '../../../components/Button'
import { StyledPost } from '../style'

const RecentPost = ({ post, done }) => {
    return (
        <StyledPost>
            <div>
                <div>
                    <h4>
                        {post.title}
                    </h4>
                </div>
                <div className="post-image">
                    <img src={post.img} alt="" />
                </div>
                <div className='post-paragraph'>
                    <p>
                        {post.body}
                    </p>
                </div>
            </div>
            <div className="apply-info">
                {done ? <Button>More Details</Button> : <Button>Apply</Button>}
                <p>{post.price}</p>
            </div>
        </StyledPost>
    )
}

export default RecentPost