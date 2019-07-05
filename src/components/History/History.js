import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import { Link } from 'react-router-dom';


class History extends Component {
    render () {
        return (
            <>
            WE WILL DISPLAY WORKOUT HISTORY HERE

            <Table>
        <TableHead>
          <TableRow>
            <TableCell>Workout</TableCell>
            <TableCell>Exercise</TableCell>
            <TableCell>Weight(lb)</TableCell>
            <TableCell>Sets</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        </Table>
        <TableBody>
              {this.props.reduxState.workout.length < 1 ? '' : this.props.reduxState.workout.map(exercise =>
                <TableRow>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.exercise_name}</TableCell>
                  <TableCell>{exercise.weight}</TableCell>
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                  <TableCell>{exercise.date}</TableCell>
                </TableRow>)}
                </TableBody>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({reduxState})
export default connect (mapReduxStateToProps)(History);