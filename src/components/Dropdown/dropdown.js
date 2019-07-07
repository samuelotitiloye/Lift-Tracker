import React, { Component } from 'react';
import { connect } from 'react-redux';


// where am i requiring this component? why does it exist?
// i am mapping through workouts(able to do this because it has a dispatch 
//to fetch/get workouts from the database)
//also able to run Fetch exercise as well grab all exercise from the database
class dropdown extends Component {
    workouts = () => {
        this.props.dispatch({ type: 'FETCH_WORKOUT' });
    }

    exercises = () => {
        this.props.dispatch({ type: 'FETCH_EXERCISE' });
    }

    componentDidMount() {
        this.workouts();
        this.exercises();
    }

    render() {
        return (
            <div>
                <pre>
                {this.props.reduxState.workouts.map(workout => { return })}
                </pre>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(dropdown)


