import React, { useRef, useState } from 'react'
import db, {auth} from '../../firebase';

import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'

function SignInScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const userNameRef = useRef(null);

    const[signUp, setSignUp] = useState(false);
    const navigate = useNavigate();

    const register = e => {

        e.preventDefault();
        const userName = userNameRef.current.value

      auth.createUserWithEmailAndPassword(
            emailRef.current.value, 
            passwordRef.current.value
            ).then((authUser) => {
                console.log(authUser)
                authUser.user.updateProfile({
                    displayName: userName
                });
                setDoc(doc(db, 'users', authUser.user.uid), { email:  authUser.user.email, uid: authUser.user.uid});
            }).catch(error => {
                alert(error.message)
            })


    };

    const signIn = e => {
        e.preventDefault();
        navigate("/")
        auth.signInWithEmailAndPassword(
            emailRef.current.value, 
            passwordRef.current.value
            ).then((authUser) => {
                console.log(authUser)
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <>
        {signUp? (
           <div className="signin">
            <form>
                <h1>Sign Up</h1>
                <input placeholder="Enter Your Email" type="email" ref={emailRef}/>
                <input placeholder="Enter Password" type="password" ref={passwordRef}/>
                <input placeholder="Enter Your Name" type="text" ref={userNameRef}/>
                <button type="submit" onClick={register}>Sign Up</button>
                <h4>
                    <span className="signin-signup" onClick={() =>setSignUp(false)}>Back To Sign In</span>
                </h4>
            </form>
            </div>
        ):(
            <>
                <div className="signin">
                <form>
                    <h1>Sign In</h1>
                    <input  type="email" ref={emailRef} defaultValue="default@mail43.com" />
                    <input  type="password" ref={passwordRef} defaultValue="password"/>
                    <button type="submit" onClick={signIn}>Sign In</button>
                    <h4>
                        <span className="signin-gray">Want to Review? </span>
                        <span className="signin-signup" onClick={() =>setSignUp(true)}>Sign Up Now</span>
                    </h4>
                </form>
                </div>
            </>
            )
        }
        </>
    )
}

export default SignInScreen;
