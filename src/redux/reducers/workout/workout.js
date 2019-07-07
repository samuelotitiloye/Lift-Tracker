import { combineReducers } from 'redux';



// this will house all of our workout REDUCERS  and must be exported to the root/ main reducer
// Used to store workout returned from the server
const workout = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORKOUT':
            return action.payload;
        default:
            return state;
    }
}

// use this reducer to SET workout to the history page
const update = (state = [], action) => {
    switch(action.type) {
        case 'SET_UPDATE':
            return action.payload;
            default:
                return state;
    }
}

// const workout = (state = [], action) => {
//     switch (action.type) {
//         case 'POST_WORKOUT':
//             return action.payload;
//         default:
//             return state;
//     }
// }

// const workout = (state = [], action) => {
//     switch (action.type) {
//         case 'DELETE_WORKOUT':
//             return action.payload;
//         default:
//             return state;
//     }
// }



export default combineReducers({
    workout,
    update
}) 