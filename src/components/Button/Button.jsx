import React from 'react';
import cx from 'classnames';
import './Button.scss';

const Button = ({type, ctaType, events, children}) => {
    return (
        <button type={type} className={cx('button', {
            primary: ctaType === 'primary',
            secundary: ctaType === 'secundary'
        })} {...events}>{children}</button>
    );
}

Button.defaultProps = {
    ctaType: 'primary'
}

export default Button;