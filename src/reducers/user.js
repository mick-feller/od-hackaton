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
        default:
            return state;
    }
}

export default user;