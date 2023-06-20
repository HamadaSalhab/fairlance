import React from 'react'
import RecentPost from '../../pages/Home/Components/RecentPost'
import { StyledBlogs } from './style'

const HorizontalBlogs = ({ posts, postIdx, previousPost, nextPost, done }) => {
    return (
        <StyledBlogs>
            {done ? <h2>Recently delivered projects:</h2> : <h2>Recently posted oppurtunities:</h2>}
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
        </StyledBlogs>
    )
}

export default HorizontalBlogs