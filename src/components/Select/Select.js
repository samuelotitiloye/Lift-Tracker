import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import logo from './logo.svg';
// import '../App/App.';

class Select extends Component {
state = {
  exercise:'',
  workout:'',
}

handleChange = (event) =>{
  this.setState({
    ...this.state, [event.target.id]:event.target.value,
  });
}

handleClick = () => {
  console.log('adding exercise to my workout', this.state);
  this.props.dispatch({type:'FETCH_EXERCISE',  payload:this.state})
  this.props.history.push  ('/Track')
  
}

  render() {
    return (
      <div className="Select">
        <header className="Select-header">
          <p> LIFT TRACKER </p>
          </header>
            <input value={this.state.workout} onChange={this.handleChange} id='workout' placeholder='select workout'></input>
            <input value={this.state.exercise} onChange={this.handleChange} id='exercise' placeholder='select exercise'></input>
            <br />
            <br />
            <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }
}


const mapReduxStateToProps = reduxState => ({reduxState})
export default connect (mapReduxStateToProps) (Select)