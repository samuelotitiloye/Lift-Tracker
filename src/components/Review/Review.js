import React, { Component } from 'react';
import {connect} from 'react-redux';
// import './App.css';
// import Select from '../Select/Select';


class Summary extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
        <>
        WE WILL DISPLAY CURRENT WORKOUT HERE
        </>
    );
  }
}


const mapReduxStateToProps = reduxState => ({reduxState})
export default connect (mapReduxStateToProps) (Summary)