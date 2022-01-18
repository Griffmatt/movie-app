import React from 'react'
import { useSelector} from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import { auth } from '../../firebase'
import Nav from '../Nav';

function ProfileScreen() {

    const user = useSelector(selectUser);

    return (
        <div className="profile">
            <Nav />
            <div className="profile-body">
                <h1>Edit Profile</h1>
                <div className="profile-info">
                    <div>
                        <img 
                        className="profile-avatar"
                        src="https://www.pinclipart.com/picdir/big/526-5262740_rammy-from-castle-crashers-clipart.png"
                        alt="Your Avatar"
                        />
                        <h2>{user.displayName}</h2>
                    </div>
                    <div className="profile-details">
                        <h2>{user.email}</h2>
                        <div className="profile-change">
                            <h3>Plans</h3>
                            <div className="profile-details-container">
                                <div className="profile-info-row">
                                    <div className="info">
                                        <h5>Premium</h5>
                                        <h6>4K + HDR</h6>
                                        
                                    </div>
                                    <button>Subscribe</button>
                                </div>
                                <div className="profile-info-row">
                                    <div className="info">
                                        <h5>Basic</h5>
                                        <h6>720p</h6>
                                    </div>
                                    <button>Subscribe</button>
                                </div>
                                <div className="profile-info-row">
                                    <div className="info">
                                        <h5>Standard</h5>
                                        <h6>1080p</h6>
                                    </div>
                                    <button>Subscribe</button>
                                </div>
                            </div>
                            <button 
                                onClick={() => auth.signOut()}
                                className="profile-signout">
                                Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;
