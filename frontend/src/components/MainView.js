import React from 'react'
import searching from '../assets/svg/searching.svg'

const MainView = () => {
    return (
        <div id="main-view">
            <div>
                <h1>Are you looking for freelancers?</h1>
                <h3>Hire freelancers fast, for free and without limits with FairLance.</h3>
                <h3>We have experienced freelancers from all around the world</h3>
                <div className='hire-search'>
                    <button>Hire freelancer</button>
                    <input type="text" placeholder="Search for a job"></input><i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <img src={searching} alt="looking for freelancer" draggable="false" />
        </div>
    )
}

export default MainView