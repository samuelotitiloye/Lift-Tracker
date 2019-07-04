import React, { Component } from 'react';
import { connect } from 'react-redux';

class dropdown extends Component {
    workouts = () => {
        this.props.dispatch ({type:'FETCH_WORKOUT'});
    }

    exercises = () => {
        this.props.dispatch ({type: 'FETCH_EXERCISE'});
    }

    componentDidMount(){
        this.workouts();
        this.exercises();
    }

    render() {
        return (
            <div>
                {this.props.reduxState.map(workout => {return })}
            </div>
            
        
            )
    }
}

const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(dropdown)

//

