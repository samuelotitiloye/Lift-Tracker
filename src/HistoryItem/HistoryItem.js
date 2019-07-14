import React, { Component } from 'react';
import { connect } from 'react-redux';


//this is a child of the workoutTableItem -  the map created here is used inside of the workoutTableItem component.
//mapping through reduxState here to get workout_exercise_history which is an action type dispatched 
//from the sagas after a get request to get workout_exercise_history from the database
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

