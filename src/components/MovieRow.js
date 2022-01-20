import React, { useState, useEffect } from 'react';
import axios from '../axios';
import ModalMovieInfo from './Modal';



function MovieRow({ title, fetchUrl, largeRow, user, list,}) {
    const [movies, setMovies]= useState([]);
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState([])

    const base_url = "https://image.tmdb.org/t/p/w300"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick =(movie)=> {
        setMovie(movie)
        setShowModal(!showModal)
    }

    return (
        <>
        {showModal?
        <ModalMovieInfo showModal={showModal} handleClick={handleClick} user={user} list={list}  movies={movie}/>:<></>}
        <div className="movie-row">
            <h2>{title}</h2>
            <div className="row-posters">
                {movies.map(movie=>{
                    return(
                        <img 
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className="row-poster" 
                            src={`${base_url}${largeRow?movie.poster_path:movie.backdrop_path}`} 
                            alt={movie.title}
                        />
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default MovieRow;
