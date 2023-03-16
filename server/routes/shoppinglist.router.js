const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "shopping-list";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in GET for database query ${error}`);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    let name = req.body.name;
    let quantity = req.body.quantity;
    let unit = req.body.unit;
    const queryText = `
    INSERT INTO "shopping-list" ("name", "quantity", "unit") 
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [name, quantity, unit]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in POST for database query ${error}`);
        res.sendStatus(500);
    })
});

module.exports = router;