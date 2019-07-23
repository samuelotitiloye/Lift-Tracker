import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import '.././components/Select/Select.css';

class DayItem extends Component {

    componentDidMount() {

    }


    handleDeleteWorkout = (id) => {
        // this.props.history.push('/select')
        console.log('Deleting single workout from the database/ and our history page');
        this.props.dispatch({ type: 'DELETE_A_WORKOUT', payload: { id: id } });
        this.props.dispatch({type:'GET_ENTIRE_HISTORY'}); //this will get the entire history again after a single workout has been deleted
        this.props.dispatch({type:'GET_WORKOUT_DATE'}); // this will get the dates again to render all the history on the DOM
        

    }


    render() {
        return (
            <div>
                <>
                    {/* ThrowBack */}
                </>
                {/* <pre>{JSON.stringify(this.props.day.date)}</pre> */}
                {/* <pre>{JSON.stringify(this.props.reduxState.workout.getEntireHistory, null, 2)}</pre> */}

                {/* // up here create a table.  */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell id='historyHeader'>Date</TableCell>
                            <TableCell id='historyHeader'>Workout</TableCell>
                            <TableCell id='historyHeader'>Exercise</TableCell>
                            <TableCell id='historyHeader'>Weight(lb)</TableCell>
                            <TableCell id='historyHeader'>Sets</TableCell>
                            <TableCell id='historyHeader'>Reps</TableCell>
                            <TableCell id='historyHeader'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* this map happens inside the table body - mapping through the data from our getEntireWorkout Saga*/}
                        {this.props.reduxState.workout.getEntireHistory.map(exercise =>
                            <>
                                {exercise.date === this.props.day.date &&
                                    // this is where you create a table row to display all the data
                                    <TableRow key={exercise.id} value={exercise.id} id='historyRows'>
                                        <TableCell><span>{exercise.date.substring(5, 7)+ "/" + exercise.date.substring(8, 10) + "/" + exercise.date.substring(0, 4)}</span></TableCell>
                                        <TableCell><span>{exercise.workout}</span></TableCell>
                                        <TableCell><span>{exercise.name}</span></TableCell>
                                        <TableCell><span>{exercise.weight}</span></TableCell>
                                        <TableCell><span>{exercise.reps}</span></TableCell>
                                        <TableCell><span>{exercise.sets}</span></TableCell>
                                        <TableCell><span><button value={exercise.id} onClick= {()=>this.handleDeleteWorkout(exercise.id)} id="deleteButton">Delete</button></span></TableCell>
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



// dateString.substring(5, 7) + "/" + dateString.substring(8, 10) + "/" + dateString.substring(0, 4)