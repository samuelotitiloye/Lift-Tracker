import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WorkoutTableItem from '../WorkoutTableItem/WorkoutTableItem';


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
  }


  handleChangeNewWorkout = (event, index, value) => {
    // set workout to the value/workout selected
    this.setState({ workout: { ...this.state.workout, workout: value } });
  }

  handleChangeWorkout = (event, index, value) => {
    // set workout to the value/workout selected
    this.setState({ workout: { ...this.state.workout, exercise: value } });
  }


  handleLogWorkout = () => {
    console.log('we can totally save/log our workout!!!!');
    this.props.history.push('/history');
    // this.setState({});
    // this.props.dispatch({});
  }


  // Renders the entire app on the DOM
  render() {
    return (
      <div>
        {/* <pre>
          {JSON.stringify(this.props, null, 2)}
        </pre> */}
        {/* <pre>
          {JSON.stringify(this.state)}
        </pre> */}
        {/* {this.state.inEditMode ? */}
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
                <WorkoutTableItem key={exercise.id} exercise={exercise} />
              )}
            </TableBody>
          </Table>
          <button onClick={this.handleLogWorkout}>Log Workout</button>
        </>
        
        <pre>
          <p>json.stringify props.workout</p>
          {this.props.reduxState.workout && JSON.stringify(this.props.reduxState.workout.workout, null, 2)}
        </pre>
      </div>

    )
  }
}

const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(Track)
