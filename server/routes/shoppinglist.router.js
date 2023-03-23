const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "shopping-list" ORDER BY "purchased" ASC, "name" ASC;`;
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

router.put('/reset', (req, res) => {
    let listEdit = req.params.body;
    const queryText = `UPDATE "shopping-list" SET "purchased" = 'false';`;
    pool.query(queryText).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in reset request ${error}`);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    let listId = req.params.id;
    let listEdit = req.params.body;
    const queryText = `UPDATE "shopping-list" SET "purchased" = 'true' WHERE "id" = $1;`;
    pool.query(queryText, [listId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in purchase request ${error}`);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    let deleteId = req.params.id;
    const queryText = `DELETE from "shopping-list" WHERE "id" = $1;`
    pool.query(queryText, [deleteId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`);
        res.sendStatus(500);
    })
});

router.delete('/clear', (req, res) => {
    const queryText = `DELETE from "shopping-list";`
    pool.query(queryText).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`);
        res.sendStatus(500);
    })
});

module.exports = router;