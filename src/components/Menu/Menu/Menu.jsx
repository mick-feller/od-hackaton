import React from 'react';
import './Menu.scss';

const Menu = ({children}) => {
  return <ul role="menu">{children}</ul>;
};

export default Menu;
