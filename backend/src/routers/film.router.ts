import { Router } from 'express';
import { sample_films, sample_genres } from '../data';

const router = Router();

//torna tutti i film
router.get("/", (req, res) => {
    res.send(sample_films);
});

//torna i film in base alla ricerca
router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    //filtra in base al termine di ricerca, ignorando le maiuscole
    const films = sample_films.filter(film => film.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(films);
});

//torna tutti i generi
router.get("/genres", (req, res) => {
    res.send(sample_genres);
});

//torna i film in base al genere
router.get("/genre/:genreName", (req, res) => {
    const genreName = req.params.genreName;
    const films = sample_films.filter(film => film.genres?.includes(genreName));
    res.send(films);
});

//torna i film in base all'id, per visualizzare la pagina del singolo film
router.get("/:filmId", (req, res) => {
    const filmId = req.params.filmId;
    const film = sample_films.find(film => film.id == filmId);
    res.send(film);
});

export default router;