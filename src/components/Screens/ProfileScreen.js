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
                    <img 
                       className="profile-avatar"
                       src="https://www.pinclipart.com/picdir/big/526-5262740_rammy-from-castle-crashers-clipart.png"
                       alt="Your Avatar"
                    />
                    <div className="profile-details">
                        <h2>{user.email}</h2>
                        <div className="profile-plans">
                            <h3>Plans</h3>
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
