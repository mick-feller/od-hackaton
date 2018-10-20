import { question } from 'api/bot';

const USER_SPEAKIG = 'USER_SPEAKIG';
const BOT_IS_THINKING = 'BOT_IS_THINKING';
const BOT_IS_THINKING_FINISH = 'BOT_IS_THINKING_FINISH';
const ADD_TO_CONVERSATION = 'ADD_TO_CONVERSATION';

const UserSpeaking = () => {
    return {
        type: USER_SPEAKIG,
    }
}
const BotIsThinking = () => {
    return {
        type: BOT_IS_THINKING
    }
}
const AddToConversation = (talk) => {
    return {
        type: ADD_TO_CONVERSATION,
        talk
    }
}

const BotFinishThinking = () => {
    return {
        type: BOT_IS_THINKING_FINISH,
    }
}

export const userSpeaking = (say) => {
    return(dispatch, getState) => {
        const { bot: { botIsThinking } } = getState();
        if( !botIsThinking ){
            
            dispatch(UserSpeaking());
            dispatch(AddToConversation({
                who: 'user',
                content: say
            }));
            // 
            dispatch(BotIsThinking());
            question(say)
                .then(response => {
                    const { anwser } = response;
                    dispatch(BotFinishThinking())
                    dispatch(AddToConversation({
                        who: 'user',
                        content: anwser
                    }));
                })
        }
    }
}

const initialState = {
    botIsThinking: false,
    bot: {
        name: "Eli",
        avatar: 'https://pbs.twimg.com/profile_images/948693100108697601/yaaaaWmE_400x400.jpg'
    },
    conversation: [
        {
            who: 'bot',
            content: 'hello world'
        }
    ] 
};

const bot = (state=initialState, action) => {
    switch(action.type){
        case 'USER_SPEAKIG':
            return {
                ...state,
                botIsThinking: false
            }
        case 'BOT_IS_THINKING':
            return {
                ...state,
                botIsThinking: true
            }
        case 'BOT_IS_THINKING_FINISH':
            return {
                ...state,
                botIsThinking: false
            }
        case 'ADD_TO_CONVERSATION':
            return {
                ...state,
                conversation: [...state.conversation, action.talk]
            }
        default:
            return state;
    }
}

export default bot;