import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as botActionCreators from 'reducers/bot';
import { Chat, Input } from 'components';
import './BotContainer.scss';

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
            <div className="botContainer">
                <div className="botContainer-chat-content">
                {
                    conversation.map( (talk, i) => {
                        const { content, who } = talk;
                        return <Chat key={i} align={(i%2) ? 'left' : 'right'} content={content} avatar={'avatar'} />
                    })
                }
                </div>
                <div> 
                <div className="botContainer-inputContainer">
                    <Input events={{
                            onChange: (ev) => {
                                this.setState({
                                    userval: ev.target.value
                                })
                            },
                            onKeyPress: (ev) => {
                                if(ev.key === 'Enter'){
                                    this.userTalk(userval);
                                }
                            }
                        }
                    } value={userval} valid={(userval)}/>
                </div>
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
