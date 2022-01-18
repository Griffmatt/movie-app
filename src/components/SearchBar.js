import React from 'react'

function SearchBar(props) {
    return (
        <div className= "searchbar">
            <input type="search" placeholder="Search For A Movie!" className="search-bar" value={props.value} onChange={(event)=> props.setSearchMovie(event.target.value)}/>
        </div>
    )
}

export default SearchBar
