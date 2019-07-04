// this will house all of our workout reducers  and must be exported to the root/ main reducer


// Used to store workout returned from the server
const workout = (state = [], action) => {
    switch (action.type) {
        case 'POST_WORKOUT':
            return action.payload;
        default:
            return state;
    }
}