import React from 'react';
import cx from 'classnames';
import './Burger.scss';

const Burger = ({events, active}) => {
    return (
        <div className={cx('burger', {active: active})} {...events}>
            <div />
            <div />
            <div />
        </div>
    );
}

export default Burger;