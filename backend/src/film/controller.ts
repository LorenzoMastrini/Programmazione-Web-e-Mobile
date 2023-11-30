const pool_controller = require('../db.ts');
const queries = require('./queries');

const getFilms = (req: any, res: any) => {
    pool_controller.query(queries.getFilmsQuery, (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

module.exports = {
    getFilms,
}