import React from 'react';
import cx from 'classnames';
import './Avatar.scss';

const Avatar = ({photoURL, size}) => {
    return <div className={cx('avatar', {
        'avatar-small': size === 'small',
        'avatar-medium': size === 'medium',
        'avatar-big': size === 'big'
    })}
    style={{backgroundImage: `url(${photoURL})`}}
    />
}

Avatar.defaultProps = {
    size: 'medium'
}

export default Avatar;