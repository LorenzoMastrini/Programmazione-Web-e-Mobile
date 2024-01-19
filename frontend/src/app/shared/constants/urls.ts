//gestisco tutti gli urls da un'unico file
const BASE_URL = 'http://localhost:5000'; //url base del server, condiviso da tutte le APIs

export const FILMS_URL = BASE_URL + '/api/films'; //url per ottenere tutti i film
export const FILMS_GENRES_URL = FILMS_URL + '/genres'; //url per ottenere tutti i generi
export const FILMS_BY_SEARCH_URL = FILMS_URL + '/search/'; //url per ottenere i film in base alla ricerca ('/' alla fine sarà seguito dal searchTerm)
export const FILMS_BY_GENRE_URL = FILMS_URL + '/genre/'; //url per ottenere i film in base al genere ('/' alla fine sarà seguito dal genere)
export const FILMS_BY_ID_URL = FILMS_URL + '/'; //url per ottenere i film in base all'id ('/' alla fine sarà seguito dall'id)

export const USER_LOGIN_URL = BASE_URL + '/api/users/login'; //url per la pagina di login
export const USER_REGISTER_URL = BASE_URL + '/api/users/register'; //url per la pagina di registrazione di un nuovo utente

export const ORDERS_URL = BASE_URL + '/api/orders/'; //url per visualizzare gli ordini
export const ORDER_CREATE_URL = ORDERS_URL + '/create'; //url per la creazione di un nuovo ordine
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser'; //url per visualizzare la conferma del nuovo ordine effettuato

export const ADMIN_URL = BASE_URL + '/api/admin'; //url per le api dell'admin
export const ADMIN_ADD_FILM = ADMIN_URL + '/films/add'; //url per aggiungere un nuovo film
export const ADMIN_DELETE_FILM = ADMIN_URL + '/films/delete/'; //url per eliminare un film
export const ADMIN_GET_ALL_ORDERS = ADMIN_URL + '/orders'; //url per visualizzare tutti gli ordini nel database