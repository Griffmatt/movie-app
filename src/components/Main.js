import React, { useEffect } from 'react'

import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SearchScreen from './Screens/SearchScreen';

import requests from './../shared/requests';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { auth } from '../firebase';
import { useDispatch, useSelector} from 'react-redux'
import { logout, login, selectUser } from '../redux/userSlice'



function Main (){  
    
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() =>{

        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                console.log(userAuth)
                dispatch(login({
                    uid: userAuth.uid,
                    email: userAuth.email,
                    displayName: userAuth.displayName 
                }));
            } else {
                dispatch(logout())
            }
        });

        return unsubscribe;
    }, [dispatch]);


    return (
        <Router>
            {!user ? (
                <LoginScreen/>
            ):(
                <Routes>
                    <Route exact path="/profile" element={<ProfileScreen/>}/>
                    <Route exact path="/" element={<HomeScreen/>}/>   
                    <Route exact path="/search" element={<SearchScreen fetchUrl={requests.fetchSearch}/>}/>                
                </Routes>

            )}
        </Router>           
    )  
}

export default Main;

