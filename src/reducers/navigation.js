const initialState = [
    {
        'id': 'home-page',
        'name': 'Home Page',
        'url': '/'
    },
    {
        'id': 'list',
        'name': 'List Page',
        'url': '/list'
    },
    {
        'id': 'item',
        'name': 'Detail',
        'url': '/list/item'
    }
]
const navitagion = (state=initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default navitagion;