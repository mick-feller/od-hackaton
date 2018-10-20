import React from 'react';
import './Avatar.scss';

const Avatar = ({src}) => {
    return <div className="avatar" styles={{backgroundImage: `url(${src || 'defaut'})`}} />
}

export default Avatar;