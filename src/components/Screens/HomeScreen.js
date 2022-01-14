import React from 'react'
import MovieRow from '../MovieRow';
import MovieBanner from '../MovieBanner';
import requests from '../../shared/requests';
import Nav from '../Nav';

function HomeScreen() {
    return (
        <>
             <Nav/>
            <MovieBanner/>
            <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} largeRow/>
            <MovieRow title="Popular" fetchUrl={requests.fetchPopular}/>
            <MovieRow title="Action" fetchUrl={requests.fetchAction}/>
            <MovieRow title="Adventure" fetchUrl={requests.fetchAdventure}/>
            <MovieRow title="Animation" fetchUrl={requests.fetchAnimation}/>
            <MovieRow title="Comedy" fetchUrl={requests.fetchComedy}/>
            <MovieRow title="Drama" fetchUrl={requests.fetchDrama}/>   
            <MovieRow title="Horror" fetchUrl={requests.fetchHorror}/>  
            <MovieRow title="Musical" fetchUrl={requests.fetchMusical}/>  
            <MovieRow title="Romance" fetchUrl={requests.fetchRomance}/>  
            <MovieRow title="Science Fiction" fetchUrl={requests.fetchScienceFiction}/>  
        </>
    )
}

export default HomeScreen;
