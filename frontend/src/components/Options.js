import React from 'react'
import signup from '../assets/svg/signup.svg'
import analyzing from '../assets/svg/analyzing.svg'
import delivery from '../assets/svg/delivery.svg'
import paid from '../assets/svg/paid.svg'

const Options = () => {
    return (
        <div id="options">
            <div><img srcSet={signup} alt="" style={{color:'red'}}/> Create account</div>
            <div><img srcSet={analyzing} alt="" /> Look for job</div>
            <div><img srcSet={delivery} alt="" /> Deliver the job</div>
            <div><img src={paid} alt=""/> Get paid</div>
        </div>
    )
}

export default Options