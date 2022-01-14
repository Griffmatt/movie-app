import React, { useRef } from 'react'
import {auth} from '../../firebase';

function SignInScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = e => {
        e.preventDefault(); /*prevents from refreshing when button is pressed*/

        auth.createUserWithEmailAndPassword(
            emailRef.current.value, 
            passwordRef.current.value
            ).then((authUser) => {
                console.log(authUser)
            }).catch(error => {
                alert(error.message)
            })
    };

    const signIn = e => {
        e.preventDefault();

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
        <div className="signin">
            <form>
                <h1>Sign In</h1>
                <input placeholder="Email" type="email" ref={emailRef}/>
                <input placeholder="Password" type="password" ref={passwordRef}/>
                <button type="submit" onClick={signIn}>Sign In</button>
                <h4>
                    <span className="signin-gray">Want to Review? </span>
                    <span className="signin-signup" onClick={register}>Sign Up now</span>
                </h4>
            </form>
        </div>
    )
}

export default SignInScreen;
