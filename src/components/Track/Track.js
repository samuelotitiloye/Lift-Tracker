import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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

  handleChangeInEdit = (propertyName) => (event) => {
    //we need to spread state , and event in order to keep the original state then 
    //edit/update the value based on what is changed in the input field
    //needed to give each input field an id in editMode in order to grab 
    //them once and use one function to target their new value
    this.setState({
      ...this.state,
      workout: {
        ...this.state.workout,
        [propertyName]: event.target.value,
      }
    });
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
    this.setState({
      workout: {
        ...this.state.workout,
        id: this.props.reduxState.workout.workout[0].id
      }
    }, () => {
      this.props.dispatch({
        type: 'UPDATE_WORKOUT', // dispatching this action to ? to the sagas & reducers (exercise.js componenet)
        payload: this.state.workout,
      })
    })
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div>
        {/* <pre>
          {JSON.stringify(this.props, null, 2)}
        </pre>
        <pre>
          {JSON.stringify(this.state)}
        </pre> */}
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

                    <TableCell> <MuiThemeProvider>
                      <DropDownMenu
                        value={this.state.workout.workout}
                        onChange={this.handleChangeNewWorkout}
                      >
                        <MenuItem value={1} primaryText="Chest" />
                        <MenuItem value={2} primaryText="Glutes" />
                        <MenuItem value={3} primaryText="Shoulders" />
                        <MenuItem value={4} primaryText="Legs" />
                        <MenuItem value={5} primaryText="Back" />

                      </DropDownMenu>
                    </MuiThemeProvider></TableCell>
                    <TableCell>


                      <MuiThemeProvider>
                        <DropDownMenu
                          value={this.state.workout.exercise}
                          onChange={this.handleChangeWorkout}
                        >
                          <MenuItem value={1} primaryText="Bench Press" />
                          <MenuItem value={2} primaryText="Hip Thrust" />
                          <MenuItem value={3} primaryText="Over Head Press" />
                          <MenuItem value={4} primaryText="Squats" />
                          <MenuItem value={5} primaryText="Deadlifts" />

                        </DropDownMenu>
                      </MuiThemeProvider>

                    </TableCell>
                    <TableCell><input placeholder={exercise.weight} onChange={this.handleChangeInEdit('weight')} id='weight' /></TableCell>
                    <TableCell><input placeholder={exercise.sets} onChange={this.handleChangeInEdit('sets')} id='sets' /></TableCell>
                    <TableCell><input placeholder={exercise.reps} onChange={this.handleChangeInEdit('reps')} id='reps' /></TableCell>
                    <TableCell><input placeholder={exercise.date} readOnly/></TableCell>
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
            <pre>
              {JSON.stringify(this.props.reduxState.workout_id, null, 2)}
            </pre>
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
