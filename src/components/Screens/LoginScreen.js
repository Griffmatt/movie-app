import React, {useState} from 'react'
import SignInScreen from './SignInScreen';


function LoginScreen() {
    const[signIn, setSignIn] = useState(false);

    return (
        <div className="login">
            <div className="login-background">
                <div>
                <img
                    onClick={() => setSignIn(false)}
                    className="login-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt=""
                />
                <button className="login-btn"
                    onClick={() => setSignIn(true)}
                >
                    Sign In
                </button>
                </div>
                <div className="login-body">
                    {signIn?(
                        <SignInScreen />
                    ):(
                    <>
                    <h1>Unlimited movies, TV,<br/> shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime!</h2>
                    <h3>Ready to Watch? Enter your email to create or restart your membership.</h3>
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
        </div>
    )
}

export default LoginScreen
