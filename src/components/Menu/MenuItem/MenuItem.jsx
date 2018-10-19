import React from 'react';
import './MenuItem.scss';

const MenuItem = ({children}) => {
  return <li role="menu-item">{children}</li>;
};

export default MenuItem;
