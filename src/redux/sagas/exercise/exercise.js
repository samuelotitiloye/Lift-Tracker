import axios from 'axios';
import { put as dispatch } from 'redux-saga/effects';
import {takeLatest} from 'redux-saga/effects';

//this will hold all of our sagas and must be exported to the rootSaga
// this.props.dispatch({type: 'POST_WORKOUT_EXERCISE', payload: this.state})


function* postWorkoutToExercise (action) {
    console.log('posting to the workout table');
    console.log(action.payload);
    // this route needs to match the post route in our server (template.router)
    const response = yield axios.post('/api/template/workout', action.payload) 
    yield dispatch({type: 'SET_WORKOUT', payload: response.data})
    console.log('response from axios',response.data);
    console.log('posted new workouts to the database'); 
}

// function* displayWorkoutOnTrackPage(action){
//     console.log('display collected workout data');
//     console.log(action); // coming from our Track js component - displayWorkoutToTrack function
//     yield axios.get('/api/template/workout_exercise') // get our newly added workout object from the database
//     console.log('retrieved new workout object from the database to display on Track page');
    
// }

function* updateWorkoutSaga (action) {
    yield axios.put('/api/template/workout_exercise', action.payload);
}




function* exerciseSaga() {
    // from select.js ditpatched action to save workout & exercises and post the data to the database
    yield takeLatest('POST_WORKOUT_EXERCISE', postWorkoutToExercise); 
    yield takeLatest('UPDATE_WORKOUT', updateWorkoutSaga);
    // from Track.js dispatched action, runs displayWorkout generator function
    // yield takeLatest('DISPLAY_NEW_WORKOUT', displayWorkout)
  }
export default exerciseSaga;











// function* updateMovie(action) {
//     console.log('trying to update');
//     const updatedMovie = yield axios.put('/api/update', action.payload)/// sending to the server
//     yield dispatch({ type: 'FETCH_MOVIES' })
//     console.log('updated movie object is:', updatedMovie);
//     // returns single item in the array and updates the details page with new data
//     yield dispatch({ type: 'SET_MOVIE', payload: updatedMovie.data[0] })
