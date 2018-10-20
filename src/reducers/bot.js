

const initialState = {
    say: "Hello Dude I'm your personal bot!"
};
const bot = (state=initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default bot;