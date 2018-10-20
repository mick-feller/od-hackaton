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

const BotFinishThinking = (talk) => {
    return {
        type: BOT_IS_THINKING_FINISH,
        talk
    }
}

const AddToConversation = (talk) => {
    return {
        type: ADD_TO_CONVERSATION,
        talk
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
                    dispatch(BotFinishThinking({
                        who: 'bot',
                        content: anwser
                    }))
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
            content: 'Hi my name is Eli and I will be '
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
                botIsThinking: true,
                conversation: [...state.conversation, {
                    who: 'bot',
                    content: '...'
                }]
            }
        case 'BOT_IS_THINKING_FINISH':
            const { conversation } = state;
                    conversation.pop();
            return {
                ...state,
                botIsThinking: false,
                conversation: [...conversation, action.talk]
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