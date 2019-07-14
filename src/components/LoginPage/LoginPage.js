import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import {createMuiTheme} from '@material-ui/styles';
import { blue, green } from '@material-ui/core/colors';
import   './LoginPage.css'

// const theme =  createMuiTheme({
//   palatte: {
//     primary: blue,
//     secondary: green
//   }
// })


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  

  // const theme = createMuiTheme({
  //   palette: {
  //     primary: red,
  //   },
  // });
  
  
  
  
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      
      <div className="loginBackground">
        <div class="overlay">
            <Container component='main' maxWidth='xs'>
              {/* <img src={dumbellRack} alt='image of a rack of dumbells'/> */}
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
          <form onSubmit={this.login}>
            <h1>Login</h1>
            <div>
              <label htmlFor="username">
                Username:
              <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              />
            </div>
          </form>
          <center>
            <button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
            >
              Register
          </button>
          </center>
          </Container>
          {/* </ThemeProvider> */}
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
