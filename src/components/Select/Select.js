import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// import React, { Component } from 'react';
// import { render } from 'react-dom';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import logo from './logo.svg';
// import '../App/App.';

class Select extends Component {
    constructor() {
        super();

        this.state = {
            workout: 0,
            exercise: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        // set workout to the value/workout selected
        this.setState({ workout: value });
        this.setState({ exercise: value });
    }

    handleclick = () => {
        console.log('saving workout and exercise to the data base through a post route');

        // this.setState
    }

    pageControl() {
        if (this.state.workout === 0 && this.setState === 0) {
            return (
                <div>Select a workout</div> && <div>Select an exercise</div>
            );
        }
        if (this.state.workout === 1 && this.setState.exercise === 1) {
            return (
                <div>Chest</div> && <div>Bench Press</div>
            );
        } else if (this.state.workout === 2) {
            return (
                <div>Glutes</div>
            )
        } else if (this.state.workout === 3) {
            return (
                <div>Shoulders</div>
            )
        } else if (this.state.workout === 4) {
            return (
                <div>Legs</div>
            )
        } else if (this.state.workout === 5) {
            return (
                <div>Back</div>
            )
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="WORKOUT"
                        style={
                            {
                                background: "#008080"
                            }
                        }
                        titleStyle={
                            {
                                color: "#FFFFF"
                            }
                        }
                        showMenuIconButton={false}
                    />
                    <left>
                        {this.pageControl()}
                    </left>
                    <DropDownMenu
                        value={this.state.workout}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={1} primaryText="Chest" />
                        <MenuItem value={2} primaryText="Glutes" />
                        <MenuItem value={3} primaryText="Shoulders" />
                        <MenuItem value={4} primaryText="Legs" />
                        <MenuItem value={5} primaryText="Back" />

                    </DropDownMenu>
                    <br /><br /><br />
                    {/* <button onClick={this.handleclick}></button> */}
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <AppBar
                        title="EXERCISE"
                        style={
                            {
                                background: "#008080"
                            }
                        }
                        titleStyle={
                            {
                                color: "#FFFFF"
                            }
                        }
                        showMenuIconButton={false}
                    />
                    <left>
                        {this.pageControl()}
                    </left>
                    <DropDownMenu
                        value={this.state.exercise}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={1} primaryText="Bench Press" />
                        <MenuItem value={2} primaryText="Hip Thrust" />
                        <MenuItem value={3} primaryText="Over Head Press" />
                        <MenuItem value={4} primaryText="Squats" />
                        <MenuItem value={5} primaryText="Deadlifts" />

                    </DropDownMenu>
                    <br /><br /><br />
                    <button onClick={this.handleclick}>Save Workout</button>
                </MuiThemeProvider>
            </div>
        );
    }
}



const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(Select)
