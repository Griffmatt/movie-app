import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import axios from '../../axios';

function SearchScreen({fetchUrl}) {

    const [searchMovie, setSearchMovie]= useState('')
    const [movies, setMovies] = useState([])

    const base_url = "https://image.tmdb.org/t/p/w300"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`${fetchUrl}${searchMovie}`)
                setMovies(request.data.results)
            return request;

        
        }
        if(searchMovie===''){
            setSearchMovie('a')
        }
        fetchData();
    }, [searchMovie]);

    return (
        <div className="search">
            <Nav/>
            <SearchBar setSearchMovie={setSearchMovie}/>
            <div className="search-posters">
                {movies.map(movie=>{
                        return(
                                <img 
                                    className="search-poster"
                                    key={movie.id}
                                    src={`${base_url}${movie.poster_path}`} 
                                    alt={movie.title}
                                />                  
                        )
                    })}
            </div>
        </div>
    )
}

export default SearchScreen

