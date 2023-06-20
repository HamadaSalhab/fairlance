import React from 'react'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import Select from 'react-select'
import Filters from './components/Filters'
import Posts from './components/Posts'
import { StyledFindContainer } from './styles'

const FindJobPage = () => {

    const sortBy = [
        { value: 'newest', label: 'Newest first' },
        { value: 'popular', label: 'Most popular first' },
        { value: 'cheaper', label: 'Lowest budget first' },
        { value: 'expensive', label: 'Highest budget first' },
    ]
    const POSTS_URL = "http://localhost:3030/posts";
    return (
        <div>
            <NavBar />
            <StyledFindContainer className='find-job-container'>
                <h1>Browse jobs</h1>
                <div className='search'>
                    <div className="search-options">
                        <SearchBar text="Search for a job" />
                        <div className='sort-by'>
                            <h4>
                                Sort by :
                            </h4>
                            <Select options={sortBy} className='select-panel' defaultValue={sortBy[0]} />
                        </div>
                    </div>
                </div>
                <div className='posts-container'>
                    <Filters />
                    <Posts URL={POSTS_URL} />
                </div>
            </StyledFindContainer>
        </div>
    )
}

export default FindJobPage