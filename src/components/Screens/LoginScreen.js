import React, {useState} from 'react'
import SignInScreen from './SignInScreen';


function LoginScreen() {
    const[signIn, setSignIn] = useState(false);

    return (
        <div className="login">
            <div className="login-background">
            <img
                className="login-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt=""
            />
            <button className="login-btn"
                onClick={() => setSignIn(true)}
            >
                Sign In
            </button>
            <div className="login-gradient"/>
            </div>
            <div className="login-body">
                {signIn?(
                    <SignInScreen />
                ):(
                <>
                 <h1>Unlimited films to review.</h1>
                 <h2>Review anywhere, Review at any time!</h2>
                 <h3>Ready to review? Enter your email to create or start your account.</h3>
                 <div className="login-input">
                     <form>
                        <input type="email" placeholder="Email Adress"/>
                        <button className="login-getStarted"
                            onClick={() => setSignIn(true)}
                        >
                            Get Started</button>
                    </form>
                 </div>
                 </>)}
            </div>
        </div>
    )
}

export default LoginScreen
