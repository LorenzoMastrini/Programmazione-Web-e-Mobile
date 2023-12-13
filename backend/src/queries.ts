const getAllQuery = "SELECT * FROM films;";
const getFilmByIdQuery = "SELECT * FROM films WHERE id = $1;"; //$1 è il parametro che viene passato alla query
const getFilmBySearchTermQuery = "SELECT * FROM films WHERE name LIKE '%' || $1 || '%';";
const getAllGenresQuery = "SELECT * FROM genres;";
const getAllFilmsByGenreQuery = "SELECT * FROM films WHERE $1=ANY(films.genres);";

const loginQuery = "SELECT * FROM users WHERE email = $1 AND password = $2;"; //$1 e $2 sono i parametri passati (in ordine) alla funzione un user.router.ts
const checkEmailExistsQuery = "SELECT * FROM users WHERE email = $1;";
const createUserQuery = "INSERT INTO users (name, email, password, address, is_admin) VALUES ($1, $2, $3, $4, $5);";

const createOrderQuery = "INSERT INTO orders (order_items, total_price, name, address, status, user_id) VALUES ($1, $2, $3, $4, $5, $6);";
const getNewOrderQuery = "SELECT * FROM orders WHERE user_id = $1 AND status = 'NEW';"; //torna il nuovo ordine effettuato da un utente (ce n'è solo uno per volta con stato "NEW")

/*
INSERT INTO orders (items, total_price, name, address, status, user_id, prova_items) VALUES (
	'{1, 2}',
	12,
	'bo',
	'bo',
	'bo',
	1,
	array['{"title": "My first day at work", "Feeling": "Mixed feeling"}',
	  '{"title": "My first day of life", "Feeling": "Una merda"}']::json[]
);
*/

module.exports = {
    getAllQuery,
    getFilmByIdQuery,
    getFilmBySearchTermQuery,
    getAllGenresQuery,
    getAllFilmsByGenreQuery,
    loginQuery,
    checkEmailExistsQuery,
    createUserQuery,
    createOrderQuery,
    getNewOrderQuery
};