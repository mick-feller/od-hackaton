import React from 'react';
import { BotContainer } from 'containers';
import { Login } from 'containers';

const WelcomeTemplate = () => {
    return (
        <div className="welcome-template">
            <BotContainer />
            <Login />
        </div>
    )
}
  
export default WelcomeTemplate