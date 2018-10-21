import { question } from 'api/bot';
import { doRedirect } from "./navigation";
import { RESET_USER_INFO } from './user';
import elitImg from 'assets/images/elit.jpg';
import bobImg from 'assets/images/elit.jpg';
import lizImg from 'assets/images/liz.jpg';
import aliceImg from 'assets/images/alice.jpg';


const START_BOT = 'START_BOT';
const USER_SPEAKIG = 'USER_SPEAKIG';
const BOT_IS_THINKING = 'BOT_IS_THINKING';
const BOT_IS_THINKING_FINISH = 'BOT_IS_THINKING_FINISH';
const ADD_TO_CONVERSATION = 'ADD_TO_CONVERSATION';

const Init = () => {
    return {
        type: START_BOT
    }
}

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
  if(!answer[0]) {
    return { answer: 'At this time i am not sure how to help you sorry, i am still learning', redirect: false };
  }
  switch(answer[0].type) {
    case 'EVENT':
      // Game!
      if(answer[0].name.toLowerCase().includes('game')) {
        return { answer: 'What kind of games are you into?', redirect: false };
      }
      return { answer: 'I have no clue what you are talking about right now.', redirect: false };
    case 'CONSUMER_GOOD':
        return { answer: `We found ${answer[0].name.toLowerCase()} in these places near you: Boca Raton, West Palm Beach or Boynton Beach. Which one would you like to go?`, redirect: false };
    case 'LOCATION':
        return { answer: `Okay we will notify the organisor and he will be in touch with you.`, redirect: true };
    case 'PERSON':
        if(answer[0].name.toLowerCase().includes('tom') || answer[0].name.toLowerCase().includes('thomas')) {
          return { answer: 'oh cool I will let Thomas know that you would like his help!', redirect: false };
        }
        if(answer[0].name.toLowerCase().includes('babysitter')) {
          return { answer: 'I think i can help with that, when do you need a babysitter?', redirect: false };
        }
        return { answer: `Okay what kind of mentor are you looking for?`, redirect: false };
    case 'OTHER':
        if(answer[0].name.toLowerCase().includes('tech')) {
          return { answer: 'Alright, i found 3 people near you that could help you, who you you like to help you? Tom (Fixes Computers), Col (Knows everything about programming) or Alice (Awesome Designer)', redirect: false,
                options: [
                    {
                        name: 'Thomas Lewis',
                        photoURL: bobImg,
                        type: 'person'
                    },
                    {
                        name: 'Colleen Smith',
                        photoURL: lizImg,
                        type: 'person'
                    },
                    {
                        name: 'Alicia Alonso',
                        photoURL: aliceImg,
                        type: 'person'
                    }
                ]
            };
        }
        return { answer: `Okay what kind of mentor are you looking for?`, redirect: false };
    default:
      return { answer: 'At this time i am not sure how to help you sorry, i am still learning', redirect: false };
  }
}

export const initBot = () => {
    return (dispatch) => {
        dispatch(Init())
    }
}

const answerModel = {
    who: '',
    content: '',
    options: []
}

export const userSpeaking = (say) => {
    return(dispatch, getState) => {
        const { bot: { botIsThinking }, user, history } = getState();
        if( !botIsThinking ){
            dispatch(UserSpeaking());
            dispatch(AddToConversation({
                who: 'user',
                content: say
            }));
            // 
            dispatch(BotIsThinking());
            question(say, user)
                .then(response => {
                    const { answer } = response;
                    console.log(answer)
                    const botAnswer = formatAnswer(answer);
                    console.log(botAnswer);
                    dispatch(BotFinishThinking({
                        ...answerModel,
                        who: 'bot',
                        content: botAnswer.answer,
                        options: botAnswer.options || []
                    }))
                    if(botAnswer.redirect) {
                      //setTimeout(() => {
                        dispatch(doRedirect('/schedule'));
                      //}, 3500);
                    }
                });
        }
    }
}

const initialState = {
    botIsThinking: false,
    info: {
        name: "Eli",
        photoURL: elitImg
    },
    conversation: [] 
};

const bot = (state=initialState, action) => {
    switch(action.type){
        case RESET_USER_INFO:
            return {...initialState}
        case START_BOT:
            return {
                ...state,
                conversation: [{
                    who: 'bot',
                    content: 'Hi my name is Eli and I will be helping you to connect in our community, what is that you are looking for?'
                }]
            }
        case USER_SPEAKIG:
            return {
                ...state,
                botIsThinking: false
            }
        case BOT_IS_THINKING:
            return {
                ...state,
                botIsThinking: true,
                conversation: [...state.conversation, {
                    who: 'bot',
                    content: '...'
                }]
            }
        case BOT_IS_THINKING_FINISH:
            const { conversation } = state;
                    conversation.pop();
            return {
                ...state,
                botIsThinking: false,
                conversation: [...conversation, action.talk]
            }
        case ADD_TO_CONVERSATION:
            return {
                ...state,
                conversation: [...state.conversation, action.talk]
            }
        default:
            return state;
    }
}

export default bot;