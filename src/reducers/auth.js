const AUTH = 'AUTH';

export const AuthAction = (val) => {
    return {
       type: AUTH,
       isAuth: val 
    }
}

export const updateAuth = (val) => {
    return (dispatch) => {
        dispatch(AuthAction(val));
    }
}

const initialState = {
    isAuth: null
}

const auth = (state=initialState, action) => {
    switch(action.type){
        case AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state;
    }
}

export default auth;