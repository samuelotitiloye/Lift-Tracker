import React, { Component } from 'react';
import { connect } from 'react-redux';



class HistoryItem extends Component {
    componentDidMount() {
    }


    render() {
        return (
            <div>
                {this.props.reduxState.workout_exercise_history.map(exercise => {
                    if (exercise.workout_id === this.props.workout.id) {
                        <workoutTableItem exercise={exercise} />
                    }
                })}
            </div>
        )
    }
}



const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(HistoryItem)



//{this.props.reduxState.workout.getEntireWorkoutHistory.map(exercise => {
//     if(exercise.date === this.props.day.date){
//         // /the data that i want to display>
//      }
//  } )}

//this.props.reduxState.getEntireWorkoutHistory.map(exercise => {
    //if(exercise.date === this.props.day.date) {
       // <{workout}, {exercise}, {weight}, {sets}, {reps}, {date}
    //}
//})