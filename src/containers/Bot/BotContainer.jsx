import React, { Component } from 'react';
import { connect } from 'react-redux'

class BotContainer extends Component{
    render(){
        const { say } = this.props;
        return(
            <div>{say}</div>
        )
    }
}

const mapStateToProps = ({bot}) => {
    const { say } = bot;
    return {
        say
    }
}

export default connect(mapStateToProps)(BotContainer);
