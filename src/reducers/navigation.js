const SET_REDIRECT = 'SET_REDIRECT';
const SET_RESET_REDIRECT = 'SET_RESET_REDIRECT';

export const SetRedirect = (url) => {
  return {
      type: SET_REDIRECT,
      url
  }
}

const SetResetRedirect = () => {
  return {
      type: SET_RESET_REDIRECT
  }
}

export const doRedirect = (url) => {
  return(dispatch, getState) => {
    console.log('URL: ', url, getState().navigation.url)
    if(url !== getState().navigation.url) {
      dispatch(SetRedirect(url));
    } else {
      dispatch(SetResetRedirect());
    }
  }
}

export const doResetRedirect = () => {
  return(dispatch) => {
    dispatch(SetResetRedirect());
  }
}

const initialState = {
  redirect: false,
  url: ''
}

const navigation = (state=initialState, action) => {
    switch(action.type){
      case SET_REDIRECT:
        return {
          ...state,
          redirect: true,
          url: action.url
        };
      case SET_RESET_REDIRECT:
        return {
          ...initialState
        };
        default:
            return state;
    }
}

export default navigation;