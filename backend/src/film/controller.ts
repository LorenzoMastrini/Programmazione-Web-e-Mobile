const pool = require('../db');
const queries = require('./queries');

const getFilms = (req: any, res: any) => {
    pool.query(queries.getFilmsQuery, (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

/*
module.exports = {
    getFilms,
}
*/