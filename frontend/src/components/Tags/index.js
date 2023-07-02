import React from 'react'
import { Tag } from './style.js';

const Tags = ({ tags }) => {
    return (
        <Tag className='tags'>
            {
                tags.map((tag,idx) => {
                    return <div key={idx}>
                        <span>#</span> {tag}
                    </div>
                })
            }
        </Tag>
    )
}

export default Tags