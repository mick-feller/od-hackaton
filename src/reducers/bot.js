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

const formatAnswer = (answer) => {
  switch(answer[0].type) {
    case 'EVENT':
      // Game!
      if(answer[0].name.toLowerCase().includes('game')) {
        return 'What kind of games are you into?';
      }
      return 'I have no clue what you are talking about right now.';
    case 'CONSUMER_GOOD':
        return `We found ${answer[0].name.toLowerCase()} in these places near you: Boca Raton, West Palm Beach or Boynton Beach. Which one would you like to go?`;
    case 'LOCATION':

        return `Okay we will notify the organisor and he will be in touch with you.`;
    case 'PERSON':
        if(answer[0].name.toLowerCase().includes('liz')) {
          return 'Cool, great choice i will have her reach out to you!';
        }
        if(answer[0].name.toLowerCase().includes('babysitter')) {
          return 'I think i can help with that, when do you need a babysitter?';
        }
        return `Okay what kind of mentor are you looking for?`;
    case 'OTHER':
        if(answer[0].name.toLowerCase().includes('tech')) {
          return 'Alright, i found 3 people near you that could help you, who you you like to help you? Bob (Fixes Computers), Liz (Knows everything about programming) or Alice (Awesome Designer)';
        }
        return `Okay what kind of mentor are you looking for?`;
    default:
      return 'at this time i am not sure how to help you sorry, i am still learning';
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
                    const { answer } = response;
                    const botAnswer = formatAnswer(answer);

                    dispatch(BotFinishThinking({
                        who: 'bot',
                        content: botAnswer
                    }))
                })
        }
    }
}

const initialState = {
    botIsThinking: false,
    info: {
        name: "Eli",
        photoURL: 'https://pbs.twimg.com/profile_images/948693100108697601/yaaaaWmE_400x400.jpg'
    },
    conversation: [
        {
            who: 'bot',
            content: 'Hi my name is Eli and I will be helping you to connect in our community, what is that you are looking for?'
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