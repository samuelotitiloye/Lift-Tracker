import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class Track extends Component {
  state = {
    inEditMode: false,
    workout: {
      workout: '',
      exercise: '',
      weight: '',
      sets: '',
      reps: '',
    }
  }

  componentDidMount() {
  }

  handleClickToEdit = () => {
    console.log('i can update my workouts!!!!!!!!!!!!!!!!!!!');
    this.setState({ inEditMode: !this.state.inEditMode })
    // this.props.dispatch({ type: 'UPDATE_WORKOUT', payload: this.state }) //this action will be called in 
  }

  handleLogWorkout = () => {
    console.log('we can totally save/log our workout!!!!');
    this.props.history.push('/history');
    // this.setState({});
    // this.props.dispatch({});
  }

  handleAddEdit = () => {
    console.log('we are going to add our newly edited workout/exercise');
    this.props.dispatch({
      type: 'UPDATE_WORKOUT', // dispatching this action to ? 
      payload: this.state.workout,
    })
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div>
        <pre>
          {JSON.stringify(this.props.reduxState.workout.workout, null, 2)}
        </pre>
        {this.state.inEditMode ?
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Workout</TableCell>
                  <TableCell>Exercise</TableCell>
                  <TableCell>Weight(lb)</TableCell>
                  <TableCell>Sets</TableCell>
                  <TableCell>Reps</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Add</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.reduxState.workout.workout.length > 0 && this.props.reduxState.workout.workout.map(exercise =>
                  <TableRow>
                    <TableCell><input placeholder={exercise.name} /></TableCell>
                    <TableCell><input placeholder={exercise.exercise_name} /></TableCell>
                    <TableCell><input placeholder={exercise.weight} /></TableCell>
                    <TableCell><input placeholder={exercise.sets} /></TableCell>
                    <TableCell><input placeholder={exercise.reps} /></TableCell>
                    <TableCell><input placeholder={exercise.date} /></TableCell>
                    <TableCell><button onClick={this.handleAddEdit}>Add</button></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <button onClick={this.handleClickToEdit}>Edit Workout</button>
            <button onClick={this.handleLogWorkout}>Log Workout</button>
          </>
          :
          // write a conditional to check if the page has data from select paage, if it does not, show nothing, 
          // if there is data map through the data and display in a table.

          // TO DO : Make an alert if add workout is not clicked - to add workout
          // make an alert if save workout is clicked - to show no workout to add

          <>
            {/* <pre>
            {JSON.stringify(this.props.reduxState.workout, null, 2)}
            </pre> */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Workout</TableCell>
                  <TableCell>Exercise</TableCell>
                  <TableCell>Weight(lb)</TableCell>
                  <TableCell>Sets</TableCell>
                  <TableCell>Reps</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.reduxState.workout.workout.length > 0 && this.props.reduxState.workout.workout.map(exercise =>
                  <TableRow>
                    <TableCell>{exercise.name}</TableCell>
                    <TableCell>{exercise.exercise_name}</TableCell>
                    <TableCell>{exercise.weight}</TableCell>
                    <TableCell>{exercise.sets}</TableCell>
                    <TableCell>{exercise.reps}</TableCell>
                    <TableCell>{exercise.date}</TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
            <button onClick={this.handleClickToEdit}>Edit Workout</button>
            <button onClick={this.handleLogWorkout}>Log Workout</button>
          </>
        }
      </div>)
  }
}


const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(Track)
