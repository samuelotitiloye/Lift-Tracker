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

router.get('/workout', (req, res) =>{
    console.log('getting workouts from the database');
    //make query request to the database
    const queryText = `SELECT * FROM "workout" ORDER BY "id";`
    pool.query(queryText)
    .then((result)=>{
        console.log(result.rows);
        res.send(result.rows);
    }).catch((errror)=>{
        console.log('error completing SELECT "workout" query', error);
        res.sendStatus(500);
    });
});

router.get('/user', (req, res)=>{
    console.log('retrieving all users from the database');
    //make query request to the database for user data
    const queryText =  `SELECT * FROM "user" ORDER BY "id";`
    pool.query(queryText)
    .then((result)=>{
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error completing SELECT "user" query');
        res.sendStatus(500);
    })  
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;
