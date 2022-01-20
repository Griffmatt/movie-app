import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../shared/requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import db from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 

function MovieBanner({user, update}){
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    const [shownTrailerId, setShownTrailerId] = useState()

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(requests.fetchPopular);
            setMovie(
                request.data.results.filter(movie => movie.title && movie.backdrop_path)[
                    Math.floor(Math.random() * request.data.results.length -1)
                ]
            )
            return request;
        }
        fetchData()
    }, [])

    
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

    const handleMylist = (movie)=> {
        setDoc(doc(db, 'users', user.uid, 'myList', movie.title), {
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            id: movie.id
        })
        update(movie)
    }

    const opts = {
        height: "750",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    function truncate(str, n) {
        return str?.length > n? str.substr(0, n-1) + "...": str;
    }
    
    return (
        <div>
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(
                        'https://image.tmdb.org/t/p/original${movie.backdrop_path}'
                    )`
                }}
            >
                <div className="banner-contents">
                    <h1 className="banner-title">{movie.title}</h1>
                    <div className="banner-btns">
                        <button className="banner-btn" onClick={() => handleClick(movie)}>Trailer</button>
                        <button className="banner-btn" onClick={() => handleMylist(movie)}>My List</button>
                    </div>
                    <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
                </div>
                <div className="banner-fade"/>
            </header>
            {trailerUrl && <YouTube videoId={trailerUrl} opts ={opts} /> }
        </div>
    )
}

export default MovieBanner
