import React, { useEffect, useState } from 'react'
import HorizontalBlogs from '../HorizontalBlogs';

const Recents = ({ URL, done }) => {

    const [posts, setPosts] = useState([]);
    const [postIdx, setPostIdx] = useState(0);

    useEffect(() => {
        fetch(URL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPosts(data)
            })
            .catch((error) => {
                for (let i = 0; i < 3; i++) {
                    setPosts([])
                }
                console.log(error);
            })
    }, [setPosts, URL]);

    const previousPost = () => {
        if (postIdx > 0) {
            setPostIdx(postIdx - 1);
        }

    }
    const nextPost = () => {
        if (postIdx + 3 < posts.length) {
            setPostIdx(postIdx + 1);
        }
    }

    return (
        <HorizontalBlogs posts={posts} postIdx={postIdx} nextPost={nextPost} previousPost={previousPost} done={done} />
    )
}

export default Recents