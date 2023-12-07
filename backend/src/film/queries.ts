const getAllQuery = "SELECT * FROM films;";
const getFilmByIdQuery = "SELECT * FROM films WHERE id = $1;"; //$1 è il parametro che viene passato alla query
const getFilmBySearchTermQuery = "SELECT * FROM films WHERE name LIKE '%' || $1 || '%';";
const getAllGenresQuery = "SELECT * FROM genres;";
const getAllFilmsByGenreQuery = "SELECT * FROM films WHERE $1=ANY(films.genres);";

const loginQuery = "SELECT * FROM users WHERE email = $1 AND password = $2;"; //$1 e $2 sono i parametri passati (in ordine) alla funzione un user.router.ts
const checkEmailExistsQuery = "SELECT * FROM users WHERE email = $1;";
const createUserQuery = "INSERT INTO users (name, email, password, address, isAdmin) VALUES ($1, $2, $3, $4, $5);";

module.exports = {
    getAllQuery,
    getFilmByIdQuery,
    getFilmBySearchTermQuery,
    getAllGenresQuery,
    getAllFilmsByGenreQuery,
    loginQuery,
    checkEmailExistsQuery,
    createUserQuery
};