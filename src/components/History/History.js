import React, { Component } from 'react';
import { connect } from 'react-redux';


class History extends Component {
    render () {
        return (
            <>
            WE WILL DISPLAY WORKOUT HISTORY HERE
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({reduxState})
export default connect (mapReduxStateToProps)(History);