import React from 'react'
import searching from '../../../assets/svg/searching.svg'
import Poster from '../../../components/Poster'
import SearchBar from '../../../components/SearchBar'
import Button from '../../../components/Button'
import { StyledHire } from '../style';

const MainView = () => {
    const Content = () => {
        return (
            <div>
                <h1>Are you looking for freelancers?</h1>
                <h3>Hire freelancers quickly, for free and without limits with FairLance.</h3>
                <h3>We have experienced freelancers from all around the world</h3>
                <StyledHire className='hire-search'>
                    <Button extraPadding={true} primary={true}>Hire freelancer</Button>
                    <SearchBar text="Search for a job" />
                </StyledHire>
            </div>
        )
    }
    return (
        <Poster img={searching} Content={Content} />
    )
}

export default MainView