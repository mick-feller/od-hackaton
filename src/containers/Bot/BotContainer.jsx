import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as botActionCreators from 'reducers/bot';
import { Chat } from 'components';

class BotContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            userval: ''
        }
    }
    userTalk(talk){
        if( !talk ){
            return null;
        }
        const { userSpeaking } = this.props;
        this.setState({
            userval: ''
        })
        userSpeaking(talk);
    }
    botTalk(talk){

    }
    render(){
        const { botIsThinking, conversation } = this.props;
        const { userval } = this.state;
        console.log(botIsThinking);
        return(
            <div>
                <div>
                {
                    conversation.map( (talk, i) => {
                        const { content, who } = talk;
                        return <Chat key={i} content={content} avatar={'avatar'} />
                    })
                }
                </div>
                 { botIsThinking && <div>'sr Im thinking'</div> }
                <div>user: 
                    <input 
                        onChange={ev => {
                            this.setState({
                                userval: ev.target.value
                            })
                        }} 
                        onKeyPress={ev => {
                            if(ev.key === 'Enter'){
                                this.userTalk(userval);
                            }
                        }}
                    value={userval}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({bot, user}) => {
    console.log(bot)
    const { botIsThinking, conversation } = bot;
    return {
        user,
        botIsThinking,
        conversation
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(botActionCreators, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(BotContainer);
