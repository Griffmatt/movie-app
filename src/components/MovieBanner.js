import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../shared/requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import db from '../firebase';
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 

function MovieBanner({user, myList, setListId, listId}){
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    const [shownTrailerId, setShownTrailerId] = useState()
    const [addedMyList, setAddedMyList] = useState(myList)

    useEffect(() => {
        setListId(myList.map(a => a.id))
    }, [myList, addedMyList, setListId])

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

        console.log(movie)
    }

    const handleMylistAdd =(movie)=> {
        setAddedMyList(myList.push(movie))
        setDoc(doc(db, 'users', user.uid, 'myList', movie.title), {
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            id: movie.id
        } )
     
    }

    const handleMylistDel = (movie)=> {
        for(let i = myList.length - 1; i >= 0; i--) {
            if(myList[i].title === movie.title) {
               setAddedMyList(myList.splice(i, 1));
            }
        }
        deleteDoc(doc(db, 'users', user.uid, 'myList', movie.title) )
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
                        {listId.includes(movie.id)?<button className="banner-btn" onClick={() => handleMylistDel(movie)}>Remove</button>:<button className="banner-btn" onClick={() => handleMylistAdd(movie)}>Add to list</button>}
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
