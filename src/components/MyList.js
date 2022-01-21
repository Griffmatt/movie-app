import React, { useState, useEffect } from 'react';
import ModalMovieInfo from './Modal';


function MyListRow({ user, myList, listId, setListId}) {
    const [movies, setMovies]= useState([]);
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState([])
  

    const base_url = "https://image.tmdb.org/t/p/w300"

    useEffect(() => {
        setMovies(myList)
    }, [myList]);

    const handleClick =(movie)=> {
        setMovie(movie)
        setShowModal(!showModal)
    }


    return (
        <>
            <ModalMovieInfo handleClick={handleClick} user={user} movies={movie} myList={myList} listId={listId} setListId={setListId} showModal={showModal} />
            {myList.length === 0?
            (<></>
            ):(
            <div className="my-list-row">
                <h2>My List</h2>
                <div className="my-list-posters">
                    {movies.map(movie=>{
                        return(
                            <img 
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className="my-list-poster" 
                                src={`${base_url}${movie.poster_path}`} 
                                alt={movie.title}
                            />
                        )
                    })}
                </div>
            </div>
            )}
        </>
    )
}

export default MyListRow;

