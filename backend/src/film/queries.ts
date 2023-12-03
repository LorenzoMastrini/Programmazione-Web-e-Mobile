const getAllQuery = "SELECT * FROM films;";
const getFilmByIdQuery = "SELECT * FROM films WHERE id = $1;"; //$1 è il parametro che viene passato alla query
const getFilmBySearchTermQuery = "SELECT * FROM films WHERE name LIKE '%' || $1 || '%';"; //$1 è il parametro che viene passato alla query

module.exports = {
    getAllQuery,
    getFilmByIdQuery,
    getFilmBySearchTermQuery
};