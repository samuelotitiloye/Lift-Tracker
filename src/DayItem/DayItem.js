import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from 'material-ui/MenuItem';
import TableHead from '@material-ui/core/TableHead';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';


class DayItem extends Component {

    componentDidMount() {

    }


    handleDeleteWorkout = (event) => {
        // this.props.history.push('/select')
        console.log('Deleting single workout from the database/ and our history page', event.target.value);
        this.props.dispatch({ type: 'DELETE_A_WORKOUT', payload:{id: event.target.value }})
    }


    render() {
        return (
            <div>

                {/* <pre>{JSON.stringify(this.props.day.date)}</pre> */}
                {/* <pre>{JSON.stringify(this.props.reduxState.workout.getEntireHistory, null, 2)}</pre> */}

                {/* // up here create a table.  */}
                <Table>
              <TableHead>
                <TableRow>
                <TableCell>Date</TableCell>
                  <TableCell>Workout</TableCell>
                  <TableCell>Exercise</TableCell>
                  <TableCell>Weight(lb)</TableCell>
                  <TableCell>Sets</TableCell>
                  <TableCell>Reps</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* this map happens inside the table body */}
                {this.props.reduxState.workout.getEntireHistory.map(exercise =>
                    <>
                        {exercise.date === this.props.day.date &&
                            // this is where you create a table row to display all the data
                            <TableRow value={exercise.id}>
                            <TableCell><span>{exercise.date}</span></TableCell>
                            <TableCell><span>{exercise.workout}</span></TableCell>
                            <TableCell><span>{exercise.name}</span></TableCell>
                            <TableCell><span>{exercise.weight}</span></TableCell>
                            <TableCell><span>{exercise.reps}</span></TableCell>
                            <TableCell><span>{exercise.sets}</span></TableCell>
                            <TableCell><span><button value={exercise.id} onClick ={this.handleDeleteWorkout}>Delete</button></span></TableCell>
                            {/* except all those are in table cells instead of spans */}
                            </TableRow>
                        }
                    </>               
                )}
                </TableBody>
                </Table>
            </div>
        )
    }
}



const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(DayItem)



