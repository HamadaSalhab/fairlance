import React from 'react'
import { Tag } from '../styles.js';

const Tags = ({ tags }) => {
    return (
        <Tag className='tags'>
            {
                tags.map((tag) => {
                    return <div>
                        <span>#</span> {tag}
                    </div>
                })
            }
        </Tag>
    )
}

export default Tags