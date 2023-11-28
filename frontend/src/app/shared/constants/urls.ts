const BASE_URL = 'http://localhost:5000'; //url del server

export const FILMS_URL = BASE_URL + '/api/films';
export const FILMS_GENRES_URL = FILMS_URL + '/genres';
export const FILMS_BY_SEARCH_URL = FILMS_URL + '/search/';
export const FILMS_BY_GENRE_URL = FILMS_URL + '/genre/';
export const FILMS_BY_ID_URL = FILMS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';