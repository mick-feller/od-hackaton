import React from 'react';
import { MainNavigationContainer, Logout } from 'containers';

const HeaderContainer = () => {
    return(
        <header>
            <Logout />
            <MainNavigationContainer />
        </header>
    )
}

export default HeaderContainer;