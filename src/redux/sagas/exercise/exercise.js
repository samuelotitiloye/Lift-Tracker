import axios from 'axios';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

//this will hold all of our SAGAS and must be exported to the rootSaga

function* postWorkoutToExercise(action) {
    // console.log('posting to the workout table');
    console.log(action.payload);
    // this route needs to match the post route in our server (template.router)
    const response = yield axios.post('/api/template/workout', action.payload)
    //this runs becauese of our action from the handleClickToSaveWorkout from the select page.
    // SET_WORKOUT is from workout.js - it is from workout Reducer it will set the workouts that have been posted
    yield put({ type: 'SET_WORKOUT', payload: response.data })
    // console.log('response from axios', response.data);
    // console.log('posted new workouts to the database');
}

function* getWorkoutsFromDatabase(action) {
    // const response = yield axios.get(`api/template/workout_exercise?id=${action.payload[0].id}`)
    const response = yield axios.get(`api/template/workout_exercise`)
    yield put({ type: 'GET_WORKOUT', payload: response.data })
    // console.log('response for the get route after editing workout', response.data);
    // yield put({ type: '' })

}


function* getWorkoutHistory(){
    const response = yield axios.get('api/template/workout_exercise')
    yield put ({type: 'WORKOUT_EXERCISE_HISTORY', payload:response.data})
    console.log('getting all workouts for the display/history page');
}

function* updateWorkoutSaga(action) {
    // console.log('this will allow me to add/update my track page after editing');
    const axiosResponse = yield axios.put('/api/template/workout_exercise', action.payload);
    // console.log('IMPORTANT RESPONSE', axiosResponse)
    yield put({type: 'FETCH_EDITED_WORKOUT', payload: axiosResponse.data});
    // yield put({ type: 'FETCH_EDITED_WORKOUT' }) // this will/should grab data edited on the track page from the database?
    // what am i sending back? sending newly updated data back to the client to be displayed on the Track workout page
    // where am i sending it to? 
    // why are am i sending it there? Client needs new data before logging workout to the history page
}

//this will handle our delete action when the delete button is clicked on the History page
function* deleteWorkoutFromHistory(action) {
    // console.log('this will let the user delete a workout from the history page');
   try {
    console.log(action.payload.id);
    yield axios.delete(`api/template/workout_exercise/${action.payload.id}`)
    yield put ({type:'CLEAR_TABLE'})
    // yield put({ type: 'FETCH__WORKOUT' })
    console.log('old logged data has been deleted from the database?')
    yield put ({type:'GET_ENTIRE_HISTORY'})
    // stuck here making this delete route. don't know how to proceed.
    //TODO: GET the delete working for client and server}
   }catch(error) {
       console.log('error making DELETE query', error);
       
   }
}

function* getWorkoutDate () {
    console.log('get just the workout table');
    const getJustWorkoutTable = yield axios.get('api/template/workout')
    yield put({type:'SET_WORKOUT_TABLE', payload:getJustWorkoutTable.data})
}

function* getEntireWorkoutHistory () {
    console.log('get the whole entire workout history from the database for me');
    const getTheEntireWorkoutHistory = yield axios.get('api/template/workout_exercise/all')
    yield put({type:'SET_ENTIRE_WORKOUT_HISTORY', payload: getTheEntireWorkoutHistory.data})
}


//This will hold and call all sagas and export them to index.js saga
function* exerciseSaga() {
    // from select.js ditpatched action to save workout & exercises and post the data to the database
    yield takeLatest('POST_WORKOUT_EXERCISE', postWorkoutToExercise);
    yield takeLatest('UPDATE_WORKOUT', updateWorkoutSaga);
    yield takeLatest('FETCH_EDITED_WORKOUT', getWorkoutsFromDatabase)
    yield takeLatest('DELETE_A_WORKOUT', deleteWorkoutFromHistory)
    //GET_HISTORY is dispatched from History.JS componentDidMount - Whatever is dispatched from the component
    // becomes the action type in the Sagas, which will run it's own function - 
    //and that function dispatch/action type is called in the Reducer
    //GET_HISTORY saga runs, then calls the getWorkoutHistory generator function which 
    //has an action/dispatch type of WORKOUT_EXERCISE_HISTORY which is then run in our reducer function getNewWorkoutHistory
    yield takeLatest('GET_HISTORY', getWorkoutHistory) 
    yield takeLatest('GET_WORKOUT_DATE', getWorkoutDate)
    yield takeLatest('GET_ENTIRE_HISTORY', getEntireWorkoutHistory)
    // yield takeLatest('_WORKOUT', deleteWorkoutFromHistory)
}
export default exerciseSaga;
