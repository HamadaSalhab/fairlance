import React from 'react'
import searching from '../../assets/svg/searching.svg'
import Poster from '../../components/Poster'
import SearchBar from '../../components/SearchBar'

const MainView = () => {
    const Content = () => {
        return (
            <div>
                <h1>Are you looking for freelancers?</h1>
                <h3>Hire freelancers quickly, for free and without limits with FairLance.</h3>
                <h3>We have experienced freelancers from all around the world</h3>
                <div className='hire-search'>
                    <button>Hire freelancer</button>
                    <SearchBar text="Search for a job"/>
                </div>
            </div>
        )
    }
    return (
        <Poster img={searching} Content={Content} />
    )
}

export default MainView