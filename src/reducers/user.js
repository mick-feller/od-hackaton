import { AuthAction } from './auth';
import { SetRedirect } from './navigation';

const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const RESET_USER_INFO = 'RESET_USER_INFO';

const UpdateUserInfo = (info) => {
    return {
        type: UPDATE_USER_INFO,
        info
    }
}

const ResetUserInfo = (info) => {
    return {
        type: RESET_USER_INFO
    }
}

export const resetUser = () => {
    return (dispatch) => {
        dispatch(AuthAction(false));
        dispatch(ResetUserInfo(true));
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
    photoURL: '',
    phoneNumber: ''
}

const user = (state=initialState, action) => {
    switch(action.type){
    case UPDATE_USER_INFO:
        return {
            ...action.info
        }
    case RESET_USER_INFO:
        return {
            ...initialState
        }
    default:
        return state;
    }
}

export default user;