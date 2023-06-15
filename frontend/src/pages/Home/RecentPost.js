import React from 'react'

const RecentPost = ({ post, done }) => {
    return (
        <div className='post'>
            <div className='post-info'>
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
                {done?<button>More Details</button>:<button>Apply</button>}
                <p>{post.price}</p>
            </div>
        </div>
    )
}

export default RecentPost