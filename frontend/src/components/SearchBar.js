import React from 'react'
import '../assets/styles/SearchBar.css'

const SearchBar = ({text}) => {
    return (
        <>
            <input type="text" placeholder={text} className='search-bar'></input><i className="fa-sharp fa-solid fa-magnifying-glass search-bari"></i>
        </>
    )
}

export default SearchBar