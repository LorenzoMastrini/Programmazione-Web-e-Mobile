const getAllQuery = "SELECT * FROM films;";
const getFilmByIdQuery = "SELECT * FROM films WHERE id = $1;"; //$1 è il parametro che viene passato alla query
const getFilmBySearchTermQuery = "SELECT * FROM films WHERE name LIKE '%' || $1 || '%';";
const getAllGenresQuery = "SELECT * FROM genres;";
const getAllFilmsByGenreQuery = "SELECT * FROM films WHERE $1=ANY(films.genres);";

const loginQuery = "SELECT * FROM users WHERE email = $1 AND password = $2;"; //$1 e $2 sono i parametri passati (in ordine) alla funzione un user.router.ts
const checkEmailExistsQuery = "SELECT * FROM users WHERE email = $1;";
const createUserQuery = "INSERT INTO users (name, email, password, address, isAdmin, token) VALUES ($1, $2, $3, $4, $5, $6);";
const getUserQuery = "SELECT * FROM users WHERE token = $1;";

const createOrderQuery = 'INSERT INTO orders ("orderItems", "totalPrice", name, address, status, "userId", "createdAt") VALUES ($1, $2, $3, $4, $5, $6, $7);';
const getNewOrderQuery = 'SELECT * FROM orders WHERE "userId" = $1 AND status = $2;'; //torna il nuovo ordine effettuato da un utente (ce n'è solo uno per volta con stato "NEW")
const confirmOrderQuery = 'UPDATE orders SET status = $2 WHERE id = $1;'; //NON FUNZIONA: aggiorna lo status dell'ordine a 'confermato'
const getUserOrdersQuery = 'SELECT * FROM orders WHERE "userId" = $1;';

const deleteFilmQuery = "DELETE FROM films WHERE id = $1;";
const addFilmQuery = 'INSERT INTO films (name, duration, genres, director, plot, "imageUrl") VALUES ($1, $2, $3, $4, $5, $6);';
const modifyFilmQuery = 'UPDATE films SET name = $2, duration = $3, genres = $4, director = $5, plot = $6, "imageUrl" = $7, price = $8, "priceRent" = $9, favorite = $10, score = $11, country = $12, year = $13, rentable = $14 WHERE id = $1;';
const getAllOrdersQuery = "SELECT * FROM orders;";

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
    getNewOrderQuery,
    confirmOrderQuery,
    getUserQuery,
    getUserOrdersQuery,
    deleteFilmQuery,
    addFilmQuery,
    modifyFilmQuery,
    getAllOrdersQuery
};