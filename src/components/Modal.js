import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { doc, setDoc, deleteDoc} from "firebase/firestore"; 
import db from '../firebase';
import {Modal, ModalBody} from 'reactstrap';

function ModalMovieInfo({ handleClick, user, movies, myList, listId, setListId, showModal}) {
    const [trailerUrl, setTrailerUrl] = useState("")
    const [shownTrailerId, setShownTrailerId] = useState()
    const [movie, setMovie] = useState([])
    const [addedMyList, setAddedMyList] = useState(myList)
    
    useEffect(() => {
        if(!showModal){
            setTrailerUrl("")
        }
        setMovie(movies)
        setListId(myList.map(a => a.id))
    }, [movies, myList, addedMyList, setListId, showModal])


    const handleTrailer =(movie)=> {
        if(trailerUrl && shownTrailerId===movie.id){
            setTrailerUrl("")
        }
        else{
            movieTrailer(movie.title)
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
                setShownTrailerId(movie.id)  
            }).catch((error) => console.log(error))
        }
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
        height: "500",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
        backgroundSize: "cover"
    }
  return(
      <Modal isOpen={showModal} className="modal-content" size="xl" toggle={handleClick}>
            <header className="modal-banner" 
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(
                        'https://image.tmdb.org/t/p/original${movie.backdrop_path}'
                    )`
                }}
            >
                <div className="modal-close" onClick={() => handleClick(movie)}>x</div>
                <div className="modal-fade" />
            </header>
            <ModalBody>
                <div className="modal-title">
                    <h1>{movie.title}</h1>
                    {movie.vote_average > 8?<h2>Highly Rated</h2>:<></>}
                    </div>
                <div className="modal-info">
                <p>{movie.overview}</p>
                </div>
                <div className="modal-bottom-row">
                    <div>
                        <button className="banner-btn" onClick={() => handleTrailer(movie)}>Trailer</button>
                        {listId.includes(movie.id)?<button className="banner-btn" onClick={() => handleMylistDel(movie)}>Remove</button>:<button className="banner-btn" onClick={() => handleMylistAdd(movie)}>Add to list</button>}
                    </div>
                    <div className="modal-rating">
                        <img className="modal-star" src="https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg" alt="Star"/>
                        <h2>{movie.vote_average}/10 <span className="modal-count">({movie.vote_count})</span></h2>
                    </div>
                </div>
            </ModalBody>
            {trailerUrl && <YouTube videoId={trailerUrl} opts ={opts} /> }
        </Modal>
  );
}

export default ModalMovieInfo;
