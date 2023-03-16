const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'group-shopping-list', 
});

module.exports = pool;
