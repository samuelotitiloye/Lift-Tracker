import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WorkoutTableItem from '../WorkoutTableItem/WorkoutTableItem';
import './Track.css'
// import Swal from 'sweetalert2';



class Track extends Component {
  state = {
    inEditMode: false,
    workout: {
      workout: '',
      exercise: '',
      weight: this.props.reduxState.workout.workout,
      sets: '',
      reps: '',
      id: ''
    }
  }



  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_WORKOUT' });
    // const Swal = require('sweetalert2');
  }

  handleChangeNewWorkout = (event, index, value) => {
    // set workout to the value/workout selected
    this.setState({ workout: { ...this.state.workout, workout: value } });
  }

  handleChangeWorkout = (event, index, value) => {
    // set workout to the value/workout selected
    this.setState({ workout: { ...this.state.workout, exercise: value } });
  }
  //this function will target the Log Workout button
  handleLogWorkout = () => {
    console.log('we can totally save/log our workout!!!!');
    this.props.history.push('/history');
    // this.setState({});
    // this.props.dispatch({});
  }


  // Renders the entire app on the DOM
  render() {
    return (
      <div className='trackBackground'>
        
        <div  className="backgroundImage"/>
        
        <div id="table">
        <h2 id="text">Track and Edit Your Workouts</h2>
          <Table >
            <TableHead>
              <TableRow id="tableRow">
                <TableCell>Workout</TableCell>
                <TableCell>Exercise</TableCell>
                <TableCell>Weight(lb)</TableCell>
                <TableCell>Sets</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Add/Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="tBody">
              {this.props.reduxState.workout.workout.length > 0 && this.props.reduxState.workout.workout.map(exercise =>
                <WorkoutTableItem key={exercise.id} exercise={exercise} id='trackTable' />
              )}
            </TableBody>
          </Table>
          <button onClick={this.handleLogWorkout} id="logWorkout">Log Workout</button>
        </div>
        </div>
    )
  }
}

const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(Track)
