const Pool = require('pg').Pool;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "progetto_programmazione_web",
    password: "lorenzo",
    port: "5433"
});

//module.exports = pool;