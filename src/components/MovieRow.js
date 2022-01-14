import React, { useState, useEffect } from 'react';
import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function MovieRow({ title, fetchUrl, largeRow }) {
    const [movies, setMovies]= useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    const [shownTrailerId, setShownTrailerId] = useState()
    

    const base_url = "https://image.tmdb.org/t/p/w300"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "750",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick =(movie)=> {

        if(trailerUrl && shownTrailerId===movie.id){
            setTrailerUrl("")
        }
        else{
            movieTrailer(null, {tmdbId: movie.id})
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
                setShownTrailerId(movie.id)  
            }).catch((error) => console.log(error))
        }
    }

    return (
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
            {trailerUrl && largeRow && <YouTube videoId={trailerUrl} opts ={opts} /> }
        </div>
    )
}

export default MovieRow;
