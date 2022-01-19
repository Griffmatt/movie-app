import React, {useEffect, useState} from 'react'
import MovieRow from '../MovieRow';
import MovieBanner from '../MovieBanner';
import requests from '../../shared/requests';
import Nav from '../Nav';
import { useSelector} from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import db from '../../firebase'
import { collection, getDocs } from "firebase/firestore";
import MyList from '../MyList';

function HomeScreen() {

    const [movies, setMovies] = useState([])

    const user = useSelector(selectUser);


    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "users", user.uid, "myList"));
            querySnapshot.forEach((doc) => {
              setMovies(movies => movies.concat(doc.data()))
            });
            return querySnapshot;
        }
        getData()
    }, [user.uid])

    return (
        <div className="homescreen">
            <Nav/>
            <MovieBanner/>
            <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} largeRow user={user}/>
            <MovieRow title="Popular" fetchUrl={requests.fetchPopular} user={user}/>
            <MovieRow title="Action" fetchUrl={requests.fetchAction} user={user}/>
            <MovieRow title="Adventure" fetchUrl={requests.fetchAdventure} user={user}/>
            <MovieRow title="Animation" fetchUrl={requests.fetchAnimation} user={user}/>
            <MyList title="My List" list={movies} user={user}/>
            <MovieRow title="Comedy" fetchUrl={requests.fetchComedy} user={user}/>
            <MovieRow title="Drama" fetchUrl={requests.fetchDrama} user={user}/>   
            <MovieRow title="Horror" fetchUrl={requests.fetchHorror} user={user}/>  
            <MovieRow title="Musical" fetchUrl={requests.fetchMusical} user={user}/>  
            <MovieRow title="Romance" fetchUrl={requests.fetchRomance} user={user}/>  
            <MovieRow title="Science Fiction" fetchUrl={requests.fetchScienceFiction} user={user}/> 
        </div>
    )
}

export default HomeScreen;
