import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import axios from '../../axios';
import ModalMovieInfo from '../Modal';
import { useSelector} from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import { collection, getDocs } from "firebase/firestore"; 
import db from '../../firebase';

function SearchScreen({fetchUrl, data}) {

    
    const [searchMovie, setSearchMovie]= useState('')
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState([])
    const [movies, setMovies] = useState([])
    const [myList, setMyList] = useState([])
    const [listId, setListId] = useState([])

    const user = useSelector(selectUser);

    useEffect(() => {
        async function getData(){
        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'myList'))
        querySnapshot.forEach((doc) => {
            setMyList(myList => myList.concat(doc.data()))
          });}

        getData()
        
    },[user.uid])
    
    


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
    }, [searchMovie, fetchUrl, data]);

    const handleClick =(movie)=> {
        setMovie(movie)
        setShowModal(!showModal)
    }


    return (
        <>
            <ModalMovieInfo handleClick={handleClick} user={user} movies={movie} myList={myList} listId={listId} setListId={setListId} showModal={showModal}/>
            <div className="search">
                <Nav/>
                <SearchBar setSearchMovie={setSearchMovie}/>
                <div className="search-posters">
                    {movies.map(movie=>{
                            return(
                                movie.poster_path?
                                    <img 
                                        className="search-poster"
                                        onClick={() => handleClick(movie)}
                                        key={movie.id}
                                        src={`${base_url}${movie.poster_path}`} 
                                        alt={movie.title}
                                    />  :<></>                
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default SearchScreen

