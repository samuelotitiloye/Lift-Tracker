import { combineReducers } from 'redux';


// this will house all of our workout REDUCERS  and must be exported to the root/ main reducer
// Used to store workout returned from the server
const workout = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORKOUT':
            console.log('inside set_workout', action.payload);
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

// this will be used to retrieve all Workouts from the db
const getNewWorkout = (state = [], action) => {
    switch (action.type) {
        case 'GET_WORKOUT':
            return action.payload;
        default:
            return state;
    }
}

//this is used to get all the new workout_exercise history
const getNewWorkoutHistory = (state = [], action) => {
    switch (action.type) {
        case 'WORKOUT_EXERCISE_HISTORY':
            return action.payload;
        default:
            return state;
    }
}

// this will be used to get DISTINCT date of workouts from the database
const getWorkoutDate = (state = [], action) => {
    switch(action.type) {
        case 'SET_WORKOUT_TABLE':
        return action.payload;
        case 'CLEAR_TABLE':
            return [];
        default:
            return state;
    }
}

//this is used to get data combining all tables to map through and 
//display unique workouts/exercises/ and days/date there were performe
const getEntireHistory = (state = [], action) => {
    switch(action.type){
        case 'SET_ENTIRE_WORKOUT_HISTORY':
            return action.payload;
            default:
                return state;
    }
}



export default combineReducers({
    workout,
    update,
    getNewWorkout,
    getNewWorkoutHistory,
    getWorkoutDate,
    getEntireHistory
}) 