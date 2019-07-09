import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayItem from '../../DayItem/DayItem';


class History extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_HISTORY' });
        this.props.dispatch({ type: 'GET_WORKOUT_DATE' });
        this.props.dispatch({ type: 'GET_ENTIRE_HISTORY' });
    }

    // handleDeleteWorkout = (event) => {
    //     // this.props.history.push('/select')
    //     console.log('Deleting single workout from the database/ and our history page');

    //     this.props.dispatch({ type: 'DELETE_A_WORKOUT', payload: event.target.value })
    // }

    render() {
        return (
            <div>

                <pre>
                {/* {JSON.stringify(this.props.reduxState.workout.getWorkoutDate, null, 2)} */}
                </pre>
                {this.props.reduxState.workout.getWorkoutDate.length > 0 && this.props.reduxState.workout.getWorkoutDate.map(day => 
                   <>
                    <DayItem day={day} key={day.date}/>
                    <br />
                    </>
                 )}                             
            </div>
            )
        }
    }
    
const mapReduxStateToProps = reduxState => ({reduxState})
export default connect(mapReduxStateToProps)(History);
                
                
                //TODO: authentication and authorization for new users
                //comment out JSON.stringify(s)
                //
                
                
