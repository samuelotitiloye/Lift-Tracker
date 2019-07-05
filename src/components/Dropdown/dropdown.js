import React, { Component } from 'react';
import { connect } from 'react-redux';


// where am i requiring this component? what does it exist?
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
                {this.props.reduxState.workouts.map(workout => {return  })}
            </div>
            
        
            )
    }
}

const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(dropdown)

//

