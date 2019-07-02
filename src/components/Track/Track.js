import React, { Component } from 'react';
import {connect} from 'react-redux';
// import { HashRouter as Router, Route } from 'react-router-dom';
// import './App.css';
// import Select from '../Select/Select';


class Track extends Component {
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