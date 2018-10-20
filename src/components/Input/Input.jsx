import React from 'react';
import cx from 'classnames';
import './Input.scss';

const Input = ({value, events, valid}) => {
    return <input className={cx('input', {'input-valid': valid})} {...events} value={value} />
}

export default Input;