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
    switch (action.type) {
        case 'SET_UPDATE':
            return action.payload;
        default:
            return state;
    }
}

const deleteWorkout = (state = [], action) => {
    switch (action.type) {
        case '_':
            return action.payload;
        default:
            return state;
    }
}

const getNewWorkout = (state = [], action) => {
    switch (action.type) {
        case 'GET_WORKOUT':
            return action.payload;
        default:
            return state;
    }
}



export default combineReducers({
    workout,
    update,
    getNewWorkout,
    deleteWorkout
}) 