import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Select.css'
import UserPage from '../UserPage/UserPage';
import '../UserPage/UserPage';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import { CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';


class Select extends Component {
    state = {
        workoutObject: {
            workout: 0,
            exercise: '',
            weight: '',
            sets: 0,
            reps: 0,
        },
        singleWorkout: []
    }


    // this targets the changes that ocuur in our workout drop down list
    handleChangeWorkout = (event, index, value) => {
        // set workout to the value/workout selected
        this.setState({ workoutObject: { ...this.state.workoutObject, workout: value } });
    }
    // this targets the changes that ocuur in our exercise drop down list
    handleChangeExercise = (event, index, value) => {
        // set workout to the value/workout selected
        this.setState({ workoutObject: { ...this.state.workoutObject, exercise: value } });
    }

    //this will target our save workout button
    handleclickToSaveWorkout = () => {
        // console.log('saving workout and exercise to the data base through a post route');
        this.props.history.push('/track') //when clicked will push user to the track workout page
        // this.setState, this dispatched action will be in ran in our exerciseSaga component, with a fetch
        this.props.dispatch({ type: 'POST_WORKOUT_EXERCISE', payload: this.state.singleWorkout })
    }

    //this will target our button to be able to add exercises to our singleWorkout object
    handleClickToAddExercise = () => {
        // console.log('add to exercise');
        this.setState({
            singleWorkout: [...this.state.singleWorkout, this.state.workoutObject]
        })
    }

    //this will target the changes that occur in our input fields 
    handleChange = (propertyName) => (event) => {
        // console.log('weights, sets and reps');
        this.setState({
            workoutObject: {
                ...this.state.workoutObject,
                [propertyName]: event.target.value
            }
        })
    }

    pageControl() {
        if (this.state.workoutObject.workout === 0 && this.state.workoutObject.exercise === 0) {
            return (
                <div>Select a workout</div> && <div>Select an exercise</div>
            );
        }
        if (this.state.workoutObject.workout === 1 && this.state.workoutObject.exercise === 1) {
            return (
                <div>Chest</div> && <div>Bench Press</div>
            );
        } else if (this.state.workoutObject.workout === 2) {
            return (
                <div>Glutes</div>
            )
        } else if (this.state.workoutObject.workout === 3) {
            return (
                <div>Shoulders</div>
            )
        } else if (this.state.workoutObject.workout === 4) {
            return (
                <div>Legs</div>
            )
        } else if (this.state.workoutObject.workout === 5) {
            return (
                <div>Back</div>
            )
        }
    }

    render() {
        return (
            <div className='selectBackground'>
                <UserPage />
                <Grid container justify="center" spacing={4}>
                    <>
                        <Grid item xs={4} >
                            <MuiThemeProvider>
                                <AppBar
                                    className='selectWorkout'
                                    title="CHOOSE A WORKOUT"
                                    style={
                                        {
                                            background: "black"
                                        }
                                    }
                                    titleStyle={
                                        {
                                            color: "WHITE"
                                        }
                                    }
                                    showMenuIconButton={false}
                                />
                                <div>
                                    {this.pageControl()}
                                </div>
                                <div className="dropdownBackground">
                                <DropDownMenu id={this.workout}
                                    value={this.state.workoutObject.workout}
                                    onChange={this.handleChangeWorkout}
                                >
                                    <MenuItem value={1} primaryText="Chest" />
                                    <MenuItem value={2} primaryText="Glutes" />
                                    <MenuItem value={3} primaryText="Shoulders" />
                                    <MenuItem value={4} primaryText="Legs" />
                                    <MenuItem value={5} primaryText="Back" />
                                </DropDownMenu>
                                </div>

                                <br /><br /><br />
                            </MuiThemeProvider>
                        </Grid>
                        <Grid item xs={4} >
                            <MuiThemeProvider>
                                <AppBar
                                    className="selectExercise"
                                    title="CHOOSE AN EXERCISE"
                                    style={
                                        {
                                            background: "black"
                                        }
                                    }
                                    titleStyle={
                                        {
                                            color: "white"
                                        }
                                    }
                                    showMenuIconButton={false}
                                />
                                <div>
                                    {this.pageControl()}
                                </div>
                                <div className="dropdownBackground">
                                <DropDownMenu id={this.exercise}
                                    value={this.state.workoutObject.exercise}
                                    onChange={this.handleChangeExercise}
                                >
                                    <MenuItem value={1} primaryText="Bench Press" />
                                    <MenuItem value={2} primaryText="Hip Thrust" />
                                    <MenuItem value={3} primaryText="Over Head Press" />
                                    <MenuItem value={4} primaryText="Squats" />
                                    <MenuItem value={5} primaryText="Deadlifts" />
                                </DropDownMenu>
                                </div>
                            </MuiThemeProvider>
                        </Grid>
                    </>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <center>
                            <input onChange={this.handleChange('weight')} placeholder="WEIGHT" id="weights" />
                            <input onChange={this.handleChange('sets')} placeholder="SETS" id="sets" />
                            <input onChange={this.handleChange('reps')} placeholder="REPS" id="reps" />
                        </center>
                    </Grid>
                </Grid>
                <center>
                    <Button onClick={this.handleClickToAddExercise} id="addExercise">Add Exercise</Button>
                    <Button onClick={this.handleclickToSaveWorkout} id="addExercise">Save Workout</Button>
                </center>
            </div>
        );
    }
}



const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(Select)

//grab the data from the dropdown list when the save workout button is clicked
//when save workout button is clicked push to the track workout page
//add inputs for weight, sets and reps to reduce the number of routes needed
//show the newly grabbed data on the track page in a table with 3 added columns for lbs/sets/reps

