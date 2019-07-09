import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class workoutTableItem extends Component {
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

      handleSaveEdit = () => {
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


    handleClickToEdit = () => {
        console.log('i can update my workouts!!!!!!!!!!!!!!!!!!!');
        this.setState({ inEditMode: !this.state.inEditMode })
        // this.props.dispatch({ type: 'UPDATE_WORKOUT', payload: this.state }) //this action will be called in 
    }

    render() {
        return (
            <>
                <TableRow>
                    <TableCell>
                        {this.state.inEditMode ?
                            <MuiThemeProvider>
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
                            </MuiThemeProvider>
                            :
                            <>
                                {this.props.exercise.name}
                            </>
                        }
                    </TableCell>
                    <TableCell>
                        {this.state.inEditMode ?
                            <MuiThemeProvider>
                                <DropDownMenu
                                    value={this.props.exercise.name}
                                    onChange={this.handleChangeWorkout}
                                >
                                    <MenuItem value={1} primaryText="Bench Press" />
                                    <MenuItem value={2} primaryText="Hip Thrust" />
                                    <MenuItem value={3} primaryText="Over Head Press" />
                                    <MenuItem value={4} primaryText="Squats" />
                                    <MenuItem value={5} primaryText="Deadlifts" />

                                </DropDownMenu>
                            </MuiThemeProvider>
                            :
                            <>
                                {this.props.exercise.exercise_name}
                            </>
                        };
                        </TableCell>
                    <TableCell>
                        {this.state.inEditMode ?
                            <input placeholder={this.props.exercise.weight} onChange={this.handleChangeInEdit('weight')} id='weight' />
                            :
                            <>
                                {this.props.exercise.weight}
                            </>
                        }
                    </TableCell>
                    <TableCell>
                        {this.state.inEditMode ?
                            <input placeholder={this.props.exercise.sets} onChange={this.handleChangeInEdit('sets')} id='sets' />
                            :
                            <>
                                {this.props.exercise.sets}
                            </>
                        }
                    </TableCell>
                    <TableCell>
                        {this.state.inEditMode ?
                            <input placeholder={this.props.exercise.reps} onChange={this.handleChangeInEdit('reps')} id='reps' />
                            :
                            <>
                                {this.props.exercise.reps}
                            </>
                        }
                    </TableCell>

                    <TableCell><input placeholder={this.props.exercise.date} readOnly /></TableCell>

                    <TableCell>
                        {this.state.inEditMode ?
                            <button onClick={this.handleAddEdit}>Add</button>
                            :
                            <button onClick={this.handleClickToEdit}>Edit Workout</button>
                        }
                    </TableCell>
                </TableRow>
                <pre>
                    {JSON.stringify (this.state, null, 2)}
                </pre>
            </>
        );
    }
}

const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(workoutTableItem)




