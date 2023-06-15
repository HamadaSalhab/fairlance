import React from 'react'
import RecentPost from './RecentPost'

const HorizontalBlogs = ({ posts, postIdx,previousPost,nextPost,done }) => {
    return (
        <div>
            <div className='recent-posts-container'>
                {done?<h2>Recently delivered projects:</h2>:<h2>Recently posted oppurtunities:</h2>}
                <div className="recents-panel">
                    <button className={((postIdx === 0) ? "disabled" : "")} onClick={previousPost}><i className="fa-solid fa-arrow-left"></i></button>
                    <div className='recent-posts'>
                        {
                            posts.map((post, idx) => {
                                if (idx >= postIdx && idx < postIdx + 3)
                                    return <RecentPost post={post} key={idx} done={done} />
                                return <></>
                            })
                        }
                    </div>
                    <button className={((postIdx + 3 >= posts.length) ? "disabled" : "")} onClick={nextPost}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    )
}

export default HorizontalBlogs