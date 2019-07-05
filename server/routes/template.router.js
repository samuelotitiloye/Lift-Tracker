const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route : selects all exercises from the db and orders them by id
 */
router.get('/exercise', (req, res) => {
    console.log('getting exercise from the database');
    //make query request to the database
    const queryText = `SELECT * FROM "exercise" ORDER BY "id";`
    pool.query(queryText)
        .then((result) => {
            console.log(queryText);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error completing SELECT exercise query', error);
            res.sendStatus(500);
        });
});

router.get('/workout', (req, res) => {
    console.log('getting workouts from the database');
    //make query request to the database
    const queryText = `SELECT * FROM "workout" ORDER BY "id";`
    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((errror) => {
            console.log('error completing SELECT "workout" query', error);
            res.sendStatus(500);
        });
});

router.get('/user', (req, res) => {
    console.log('retrieving all users from the database');
    //make query request to the database for user data
    const queryText = `SELECT * FROM "user" ORDER BY "id";`
    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error completing SELECT "user" query');
            res.sendStatus(500);
        })
})

/**
 * POST route template
 */
// router.post('/workout', async (req, res) => {
//         console.log('req.body:', req.body);
//         const client = await pool.connect();
//         try {
//             const queryText = `INSERT INTO "workout_exercise" ("workout_id", "exercise_id", "weight", "sets", "reps")
//         VALUES ($1, $2, $3, $4, $5) RETURNING "workout_exercise"."id";`
//             req.body.forEach(workout => {
//                 client.query(queryText, [workout.workout, workout.exercise, workout.weight, workout.sets, workout.reps]) // queryText replaces our req.body
//                     .then((result) => {
//                         console.log('result:', result.rows);
//                     }).then(() => {
//                         `SELECT "workout_id", "exercise_id", "weight", "sets", "reps", "workout", "exercise" FROM "workout_exercise" 
//                         JOIN "workout"
//                         ON "workout_id"="workout"."id"
//                         JOIN "exercise"
//                         ON "exercise_id"="exercise"."id"
//                         WHERE "workout_id" =result.rows[0].id;`
//                     }).then((result) => {
//                         res.send(result.rows)
//                     })
//             })

//         } catch (error) {
//             console.log('error making INSERT query', error);
//             res.sendStatus(500);
//         } finally {
//             client.release();
//         }
//     });


router.post('/workout', async (req, res) => {
    const client = await pool.connect();
    try {
        client.query('BEGIN');
        const promiseResult = await Promise.all(req.body.map(workout => { // map through req.body array
            const insertQuery = `INSERT INTO "workout_exercise" ("workout_id", "exercise_id", "weight", "sets", "reps")
        VALUES ($1, $2, $3, $4, $5) RETURNING "workout_exercise"."id";`
            return client.query(insertQuery, [workout.workout, workout.exercise, workout.weight, workout.sets, workout.reps])
        }))
            .then( async(result) => {
                const newResult = await Promise.all(result.map(exercise =>{
                   // console.log('exercise:',exercise.rows[0].id);
                    const selectQuery = `SELECT "weight", "sets", "reps", "workout"."name", "exercise", "workout_exercise"."date", "exercise"."name" AS "exercise_name" 
                    FROM "workout_exercise" JOIN "workout" ON "workout_id"="workout"."id" JOIN "exercise"
                    ON "exercise_id"="exercise"."id" WHERE "workout_exercise"."id" =$1;`
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

module.exports = router;

// "workout_id", "exercise_id",

// router.put('/update', (req, res) => {
//     console.log('we are updating');
//     const queryText = `UPDATE "movies" 
//     SET "title"=$1, "description"=$2
//     WHERE "id"=$3 RETURNING "id", "title", "description", "poster";`;
//     const updateName = [req.body.title, req.body.description, req.body.id];
//     pool.query(queryText, updateName)
//         .then(result => {
//             console.log('returning the result of the update!!!!!!!!!!!', result.rows);
//             res.send(result.rows)
//         })
// })

// 

// router.get('/workout/:id', (req, res))

router.put('/workout_exercise', (req, res) => {
    console.log('req.param:yooooooooooooooooooooooooooo dude!!!!!!!!!!', req.params);
    const queryText = `UPDATE ""`
})