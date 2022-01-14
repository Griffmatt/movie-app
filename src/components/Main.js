import React, { useEffect } from 'react'

import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';

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
                </Routes>
            )}
        </Router>           
    )  
}

export default Main;

