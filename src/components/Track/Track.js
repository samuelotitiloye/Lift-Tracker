import React, { Component } from 'react';
import {connect} from 'react-redux';
// import { HashRouter as Router, Route } from 'react-router-dom';
// import './App.css';
// import Select from '../Select/Select';


class Track extends Component {
  componentDidMount () {
    this.displayWorkoutsOnTrack()
  }


  displayWorkoutsOnTrack = () => {
    console.log('we need to log and test this');
    this.props.dispatch({type:'DISPLAY_NEW_WORKOUT'})
  }

  // Renders the entire app on the DOM
  render() {
    return (
        <>
        WE WILL TRACK WORKOUTS HERE
        </>
    );
  }
}


const mapReduxStateToProps = reduxState => ({reduxState})
export default connect (mapReduxStateToProps) (Track)