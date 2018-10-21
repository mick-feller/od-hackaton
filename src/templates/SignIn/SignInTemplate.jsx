import React from 'react';
import { LoginContainer } from 'containers';
import { Button } from 'components';
import './SignInTemplate.scss';

const SignInTemplate = () => {
    return (
        <div className="SignInTemplate">
            <div>
                <h1>Welcome To Elite Connect</h1>
                <hr />
                <h2>Get to know the people around you</h2>
            </div>
            <div>
                <LoginContainer />
            </div>
            <div>
                <Button ctaType="secundary">Existing Member</Button>
            </div>
        </div>
    )
}
  
export default SignInTemplate