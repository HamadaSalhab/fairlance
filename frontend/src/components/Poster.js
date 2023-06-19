import React from 'react';

const Poster = ({ img, left, Content }) => {
    return (
        <div className="main-view">
            {(left ? <img src={img} alt="" draggable="false" style={{ marginRight: 'auto', marginLeft: 0 }} /> : '')}
            <Content />
            {(!left ? <img src={img} alt="" draggable="false" /> : '')}
        </div>
    )
}

export default Poster