import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import * as botActionCreators from 'reducers/bot';
import { Chat, Input, Button, Profile } from 'components';
import './BotContainer.scss';

class botContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            userval: ''
        }
    }
    componentDidMount(){
        const { initBot } = this.props;
        initBot();
    }
    userTalk(talk){
        if( !talk ){
            return null;
        }
        const { userSpeaking } = this.props;
        this.setState({
            userval: ''
        }, () => {
            userSpeaking(talk);
        })
        
    }
    componentDidUpdate(prevProps){
        const { conversation } = this.props;
        const { conversation: preConversation } = prevProps;
        if(conversation.length !== preConversation.length && this.scroller){
            this.scroller.scrollTop = this.scroller.scrollHeight;
        }
    }
    render(){
        const { botProfile, userProfile, botIsThinking, conversation, doRedirect } = this.props;
        const { userval } = this.state;
        return(
            <div className="bot-container">
                <div className="bot-container-chat-content" ref={node => this.scroller = node}>
                    <TransitionGroup className="bot-container-scroller">
                    {
                        conversation.map( (talk, i) => {
                            const { content, who, options } = talk;
                            const { photoURL } = who === 'bot' ? botProfile : userProfile;
                            console.log(options)
                            return (
                                <CSSTransition
                                    key={i}
                                    timeout={(i%2) ? 500 : 1500}
                                    classNames="fade"
                                >
                                    <Chat key={i} align={who !== 'bot' ? 'left' : 'right'} photoURL={photoURL}>
                                        <div>{content}</div>
                                        {options && 
                                            <div className="bot-container-options">
                                                {options.map( option => {
                                                    switch(option.type){
                                                        case 'person':
                                                            return <Profile key={option.name} {...option} />
                                                        default: 
                                                        return null
                                                    }
                                                })}
                                            </div>
                                        }
                                    </Chat>
                                </CSSTransition>
                            )
                        })
                    }
                    </TransitionGroup>
                </div>
                <div className="bot-container-inputContainer">
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
                    { userval &&
                        <Button events={
                            {
                                onClick: () => {
                                    this.userTalk(userval);
                                }
                            }
                        }>
                            <svg width="15px" height="15px" viewBox="0 0 28 33">
                                <g transform="translate(-10.000000, -8.000000)" fill="#000000">
                                    <g transform="translate(24.676471, 24.676471) rotate(90.000000) translate(-24.676471, -24.676471) translate(-0.823529, -0.823529)">
                                        <path d="M39.2012362,23.6884143 L39.2511874,23.6992482 L17.8382489,23.6992482 L24.5696946,17.0103479 C24.8993206,16.6837833 25.0801335,16.2413991 25.0801335,15.7770892 C25.0801335,15.3127793 24.8993206,14.8734905 24.5696946,14.546152 L23.5222802,13.5071296 C23.1929144,13.180565 22.7540202,13 22.2859878,13 C21.8176952,13 21.3785409,13.1792752 21.0491751,13.5058399 L9.51018572,24.9456624 C9.17951913,25.2735168 8.99870616,25.710226 9.00000697,26.1747939 C8.99870616,26.6419413 9.17951913,27.0789085 9.51018572,27.406247 L21.0491751,38.8471013 C21.3785409,39.173408 21.8174351,39.3529412 22.2859878,39.3529412 C22.7540202,39.3529412 23.1929144,39.1731501 23.5222802,38.8471013 L24.5696946,37.8080789 C24.8993206,37.4820302 25.0801335,37.0466106 25.0801335,36.5823007 C25.0801335,36.1182488 24.8993206,35.7057868 24.5696946,35.3794801 L17.7622815,28.6531771 L39.2251711,28.6531771 C40.1895937,28.6531771 41,27.829027 41,26.8733224 L41,25.4037815 C41,24.4480769 40.1656587,23.6884143 39.2012362,23.6884143 Z" id="Path"></path>
                                    </g>
                                </g>
                            </svg>
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({bot, user}) => {
    const { info: botProfile, botIsThinking, conversation } = bot;
    return {
        botProfile,
        userProfile: user,
        botIsThinking,
        conversation
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(botActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(botContainer);
