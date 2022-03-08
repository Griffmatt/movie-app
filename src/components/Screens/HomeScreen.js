import React, { useState, useEffect } from 'react'
import MovieRow from '../MovieRow';
import MovieBanner from '../MovieBanner';
import requests from '../../shared/requests';
import Nav from '../Nav';
import { useSelector} from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import { collection, getDocs } from "firebase/firestore"; 
import db from '../../firebase';
import MyListRow from '../MyList';



function HomeScreen() {

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

    return (
        <div className="homescreen">
            <Nav />
            <MovieBanner user={user}  myList={myList} listId={listId} setListId={setListId}/>
            <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} largeRow user={user} myList={myList} listId={listId} setListId={setListId} />
            <MovieRow title="Popular" fetchUrl={requests.fetchPopular} user={user}  myList={myList} listId={listId} setListId={setListId}/>
            <MovieRow title="Action" fetchUrl={requests.fetchAction} user={user}  myList={myList} listId={listId} setListId={setListId}/>
            <MovieRow title="Adventure" fetchUrl={requests.fetchAdventure} user={user}  myList={myList} listId={listId} setListId={setListId}/>
            <MovieRow title="Animation" fetchUrl={requests.fetchAnimation} user={user}  myList={myList} listId={listId} setListId={setListId}/>
            <MyListRow user={user} myList={myList} listId={listId} setListId={setListId}/>
            <MovieRow title="Comedy" fetchUrl={requests.fetchComedy} user={user} myList={myList} listId={listId} setListId={setListId}/>
            <MovieRow title="Drama" fetchUrl={requests.fetchDrama} user={user}  myList={myList} listId={listId} setListId={setListId}/>   
            <MovieRow title="Horror" fetchUrl={requests.fetchHorror} user={user} myList={myList} listId={listId} setListId={setListId}/>  
            <MovieRow title="Musical" fetchUrl={requests.fetchMusical} user={user}   myList={myList} listId={listId} setListId={setListId}/>  
            <MovieRow title="Romance" fetchUrl={requests.fetchRomance} user={user}  myList={myList} listId={listId} setListId={setListId}/>  
            <MovieRow title="Science Fiction" fetchUrl={requests.fetchScienceFiction} user={user}  myList={myList} listId={listId} setListId={setListId}/> 
        </div>
    )
}

export default HomeScreen;
