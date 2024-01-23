import { Router } from 'express';
import { pool } from "../db";
import { Film } from '../models/film.model';

const router = Router();
const queries = require('../queries');

//elimina un film dal database in base all'id passato come parametro nell'URL
router.delete("/films/delete/:filmId", (req, res) => {
    const id = req.params.filmId;
    pool.query(queries.deleteFilmQuery, [id], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json("Film eliminato con successo.");
    });
});

//aggiunge un nuovo film al database
router.post("/films/add", (req, res) => {
    const requestFilm = req.body;

    const newFilm: Film = {
        id: '', //inizializzato dal database in automatico
        name: requestFilm.name,
        duration: requestFilm.duration,
        genres: requestFilm.genres,
        director: requestFilm.director,
        plot: requestFilm.plot,
        imageUrl: requestFilm.imageUrl,
        price: 0,
        priceRent: 0,
        favorite: false,
        score: 0,
        origins: [],
        year: 0,
        rentable: 0
    }

    pool.query(queries.addFilmQuery, [newFilm.name, newFilm.duration, newFilm.genres, newFilm.director, newFilm.plot, newFilm.imageUrl], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows[0]);
    });
});

//aggiunge un nuovo film al database
router.put("/films/modify/:id", (req, res) => {
    const id = req.params.id;
    const requestFilm = req.body;

    const updatedFilm: Film = {
        id: id, //inizializzato dal database in automatico
        name: requestFilm.name,
        duration: requestFilm.duration,
        genres: requestFilm.genres,
        director: requestFilm.director,
        plot: requestFilm.plot,
        imageUrl: requestFilm.imageUrl,
        price: requestFilm.price,
        priceRent: requestFilm.priceRent,
        favorite: requestFilm.favorite,
        score: requestFilm.score,
        origins: requestFilm.origins,
        year: requestFilm.year,
        rentable: requestFilm.rentable
    }

    pool.query(queries.modifyFilmQuery, [updatedFilm.id,
                                        updatedFilm.name,
                                        updatedFilm.duration,
                                        updatedFilm.genres,
                                        updatedFilm.director,
                                        updatedFilm.plot,
                                        updatedFilm.imageUrl,
                                        updatedFilm.price,
                                        updatedFilm.priceRent,
                                        updatedFilm.favorite,
                                        updatedFilm.score,
                                        updatedFilm.origins,
                                        updatedFilm.year,
                                        updatedFilm.rentable], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows[0]);
    });
});

export default router;