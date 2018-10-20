import { AuthAction } from './auth';
import { SetRedirect } from './navigation';

const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

const UpdateUserInfo = (info) => {
    return {
        type: UPDATE_USER_INFO,
        info
    }
}

export const updateUser = (info) => {
    return (dispatch) => {
        dispatch(UpdateUserInfo(info));
        dispatch(AuthAction(true));
        dispatch(SetRedirect('/'));
    }
}


const initialState = {
    isAuth: false,
    userid: '',
    displayName: '',
    isnew: '',
    photoURL: 'https://media.makeameme.org/created/proud-face.jpg',
    phoneNumber: ''
}

const user = (state=initialState, action) => {
    switch(action.type){
    case UPDATE_USER_INFO:
        return {
            ...action.info
        }
        default:
            return state;
    }
}

export default user;