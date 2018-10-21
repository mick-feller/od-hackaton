import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BotContainer, LogoutContainer } from 'containers';
import { Burger, Avatar } from 'components';
import './HomeTemplate.scss';

class HomeTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false
        }
    }
    render(){
        const {isNavOpen} = this.state;
        const { user: {displayName, phoneNumber, photoURL} } = this.props;
        return(
            <div className={`home-template ${isNavOpen && 'navActive'}`}>
                <div className="burger-container"><Burger active={isNavOpen} events={{
                    onClick: () => {
                        this.setState({
                            isNavOpen: !isNavOpen
                        })
                    }
                }}/></div>
                <div className="side-nav">
                    <div><Avatar photoURL={photoURL} size="big" /></div>
                    <div>{displayName}</div>
                    <div><LogoutContainer /></div>
                </div>
                <div className="content" onClick={ev => this.setState({
                    isNavOpen: false
                })}>
                    <BotContainer />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(HomeTemplate)