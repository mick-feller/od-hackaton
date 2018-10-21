import React from 'react';
import { Avatar } from 'components';
import './Profile.scss';

const Profile = ({photoURL, name}) => {
    return (
        <div className="profile">
            <div className="profile-avatar-container"><Avatar photoURL={photoURL} size="small" /></div>
            <div className="profile-name">{name}</div>
        </div>
    )
}

export default Profile;