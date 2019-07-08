const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route : selects all exercises from the db and orders them by id
 */
router.get('/workout_exercise', (req, res) => {
    console.log('getting workouts from the database');
    //make query request to the database
    const queryText = `SELECT "weight", "sets", "reps", "workout"."name", "workout"."date", "exercise"."name" as "exercise", "workout_exercise"."id"
    FROM "workout_exercise" 
    JOIN "workout" 
    ON "workout_id"="workout"."id"
    JOIN "exercise"
    ON "exercise_id"="exercise"."id" 
    WHERE "workout_exercise"."id"=$1`
    console.log(req.query);
    pool.query(queryText, [req.query.id])
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((errror) => {
            console.log('error completing SELECT "workout" query', error);
            res.sendStatus(500);
        });
});

/**
 * POST &/ GET ROUTE route : grabs data entered from the select page when workout and exercises are selected
 */
router.post('/workout', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    try {
        client.query('BEGIN');
        const promiseResult = await Promise.all(req.body.map(workout => { // map through req.body array
            const insertQuery = `INSERT INTO "workout_exercise" ("workout_id", "exercise_id", "weight", "sets", "reps")
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING "workout_exercise"."id";`
            return client.query(insertQuery, [workout.workout, workout.exercise, workout.weight, workout.sets, workout.reps])
        }))
            .then(async (result) => {
                const newResult = await Promise.all(result.map(exercise => {
                    // console.log('exercise:',exercise.rows[0].id);
                    const selectQuery = `SELECT "workout_exercise"."id","weight", "sets", "reps", "workout"."name", "exercise", "workout_exercise"."date", "exercise"."name" AS "exercise_name" 
                    FROM "workout_exercise" 
                    JOIN "workout" 
                    ON "workout_id"="workout"."id" 
                    JOIN "exercise"
                    ON "exercise_id"="exercise"."id" 
                    WHERE "workout_exercise"."id" =$1;`
                    return client.query(selectQuery, [exercise.rows[0].id])
                }))
                // console.log('new result:',newResult)
                return newResult;
            })
        const sortResult = sort(promiseResult);
        console.log('sort result', sortResult)
        client.query('COMMIT');
        res.send(sortResult);
    } catch (error) {
        client.query('ROLLBACK');
        console.log('error making INSERT query', error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

const sort = (array) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i].rows;
        newArray.push(...element);
    }
    return newArray;
}

// this is our update route for the track workout page when the we edit a workout
router.put('/workout_exercise', rejectUnauthenticated, (req, res) => {
    console.log('req.param:yooooooooooooooooooooooooooo dude!!!!!!!!!!', req.body);
    const queryText = `UPDATE "workout_exercise" 
    SET "workout_id" =$1, 
    "exercise_id" =$2, 
    "weight"=$3,
    "sets"=$4,
    "reps" =$5
    WHERE "workout_exercise"."id"=$6
    RETURNING "workout_exercise"."id";`;
    const updateWorkout = [req.body.workout, req.body.exercise, req.body.weight, req.body.sets, req.body.reps, req.body.id];
    console.log('update workout',updateWorkout)
    pool.query(queryText, updateWorkout)
        .then(result => {
            res.send(result.rows)
        }).catch((error) => {
            console.log('error making UPDATE/PUT request', error);
            res.sendStatus(500)
        })
})

// RETURNING "workout", "exercise", "weight", "sets", "reps" 


// this is our delete route for the workout history page
router.delete('/workout_exercise/:id', rejectUnauthenticated, (req, res) => {
    pool.query('DELETE FROM "workout_exercise" WHERE "workout_id"=$1', [req.params, req.user.id])
        .then(result => {
            console.log(result);
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error with DELETE query', error);
            res.sendStatus(500)
        })
})


module.exports = router;

