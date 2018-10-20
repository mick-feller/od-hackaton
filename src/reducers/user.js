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
        default:
            return state;
    }
}

export default auth;