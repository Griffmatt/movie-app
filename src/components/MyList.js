import React, { useState} from 'react';
import { Modal, ModalBody} from 'reactstrap';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


function MyList({ title, list, user }) {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    const [shownTrailerId, setShownTrailerId] = useState()
    

    const base_url = "https://image.tmdb.org/t/p/w300"


    const handleClick =(movie)=> {
        setMovie(movie)
        setShowModal(!showModal)
        setTrailerUrl("")
    }
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

    const opts = {
        height: "500",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
        backgroundSize: "cover"
    }

    return (
        <>
        {list.length === 0?(<></>):(
        <>
        <Modal isOpen={showModal} className="modal-content" size="xl">
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
                        <button className="banner-btn" >Added</button>
                    </div>
                    <div className="modal-rating">
                        <img className="modal-star" src="https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg" alt="Star"/>
                        <h2>{movie.vote_average}/10 <span className="modal-count">({movie.vote_count})</span></h2>
                    </div>
                </div>
            </ModalBody>
            {trailerUrl && <YouTube videoId={trailerUrl} opts ={opts} /> }
        </Modal>
        <div className="my-list-row">
            <h2>{title}</h2>
            <div className="my-list-posters">
                {list.map(movie=>{
                    return(
                        <div>
                            <img 
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className="row-poster" 
                                src={`${base_url}${movie.poster_path}`} 
                                alt={movie.title}
                            />
                        </div>
                    )
                })}
            </div>
        </div></>)}
        </>
    )
}

export default MyList;