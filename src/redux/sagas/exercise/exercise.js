import axios from 'axios';
import { put } from 'redux-saga/effects';
import {takeLatest} from 'redux-saga/effects';

//this will hold all of our SAGAS and must be exported to the rootSaga

// this.props.dispatch({type: 'POST_WORKOUT_EXERCISE', payload: this.state})


function* postWorkoutToExercise (action) {
    console.log('posting to the workout table');
    console.log(action.payload);
    // this route needs to match the post route in our server (template.router)
    const response = yield axios.post('/api/template/workout', action.payload) 
    //this runs becauese of our action from the handleClickToSaveWorkout from the select page.
    // SET_WORKOUT is from workout.js - it is from workout Reducer it will set the workouts that have been post
    yield put({type: 'SET_WORKOUT', payload: response.data}) 
    console.log('response from axios',response.data);
    console.log('posted new workouts to the database'); 
}

function* getWorkoutsFromDatabase(action) {
    const response = yield axios.get('api/template/workout_exercise', action.payload)
    yield put({type:'SET_NEW_EDIT_WORKOUT', payload:response.data})
    console.log('response for the get route after editing workout', response.data);
    
}

// // function* displayWorkoutOnTrackPage(action){
// //     console.log('display collected workout data');
// //     console.log(action); // coming from our Track js component - displayWorkoutToTrack function
// //     yield axios.get('/api/template/workout_exercise') // get our newly added workout object from the database
// //     console.log('retrieved new workout object from the database to display on Track page');
    

function* updateWorkoutSaga (action) {
    console.log('this will allow me to add/update my track page after editing');
    const updatedWorkout = axios.put('/api/template/workout_exercise', action.payload);
    yield put ({type:'FETCH_EDITED_WORKOUT'}) // action type will be 
    console.log('updatedWorkout object is:', updatedWorkout);
    // what am i sending back? 
    // where am i sending it to? 
    // why are am i sending it there
}

function* deleteWorkoutFromHistory (action) {
    console.log('this will let the user delete a workout from the history page');
    const deleteOneWorkout =  axios.delete('api/template/workout_exercise', actiod.payload)
    yield put ({type: 'DELETE_A_WORKOUT'})
// stuck here making this delete route. don't know how to proceed.
//TODO: GET the delete working for client and server
    
}


//This will hold and call all of my sagas and export them to index.js saga
function* exerciseSaga() {
    // from select.js ditpatched action to save workout & exercises and post the data to the database
    yield takeLatest('POST_WORKOUT_EXERCISE', postWorkoutToExercise); 
    yield takeLatest('UPDATE_WORKOUT', updateWorkoutSaga);
    yield takeLatest('FETCH_EDITED_WORKOUT', getWorkoutsFromDatabase)

    yield takeLatest('DELETE_WORKOUT', deleteWorkoutFromHistory)
    // from Track.js dispatched action, runs displayWorkout generator function
    // yield takeLatest('DISPLAY_NEW_WORKOUT', displayWorkout)
  }
export default exerciseSaga;
