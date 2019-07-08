import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



class History extends Component {
    handleDeleteWorkout = (event) => {
        // this.props.history.push('/select')
        console.log('Deleting single workout from the database/ and our history page');
        this.props.dispatch ({ type: 'DELETE_A_WORKOUT', payload:event.target.value})
    }
    render() {
        return (
            <div>
                <>
                    {/* WE WILL DISPLAY WORKOUT HISTORY HERE */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Workout</TableCell>
                                <TableCell>Exercise</TableCell>
                                <TableCell>Weight(lb)</TableCell>
                                <TableCell>Sets</TableCell>
                                <TableCell>Reps</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Date</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxState.workout.getNewWorkout.length > 0 && this.props.reduxState.workout.getNewWorkout.map(exercise =>
                                <TableRow>
                                    <TableCell>{exercise.name}</TableCell>
                                    <TableCell>{exercise.exercise}</TableCell>
                                    <TableCell>{exercise.weight}</TableCell>
                                    <TableCell>{exercise.sets}</TableCell>
                                    <TableCell>{exercise.reps}</TableCell>
                                    <TableCell>{exercise.date}</TableCell>
                                    <TableCell><button value={exercise.id} onClick={this.handleDeleteWorkout}>Delete</button></TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                    <pre>
                        {/* {JSON.stringify(this.props.reduxState, null, 2)} */}
                    </pre>
                </>

            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({ reduxState })
export default connect(mapReduxStateToProps)(History);


//TODO: authentication and authorization for new users
//comment out JSON.stringify(s)
//


