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
        duration: 0,
        genres: [],
        director: '',
        plot: '',
        imageUrl: requestFilm.imageUrl,
        price: 0,
        priceRent: 0,
        trending: false,
        score: 0,
        country: '',
        year: 0,
        purchaseMethodsAvailable: 'both',
        comingSoon: true //nuovi film vengono automaticamente etichettati come 'in arrivo' (hanno solo le informazioni del nome e dell'immagine)
    }

    pool.query(queries.addFilmQuery, [newFilm.name, newFilm.imageUrl, newFilm.comingSoon], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows[0]);
    });
});

//aggiorna le informazioni di un film già esistente nel database
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
        trending: requestFilm.trending,
        score: requestFilm.score,
        country: requestFilm.country,
        year: requestFilm.year,
        purchaseMethodsAvailable: requestFilm.purchaseMethodsAvailable,
        comingSoon: false //al momento dell'inserimento delle informazioni complete vengono visualizzati come disponibili all'acquisto
    }

    if(updatedFilm.purchaseMethodsAvailable === 'buyOnly') {
        updatedFilm.priceRent = -1;
    } else if(updatedFilm.purchaseMethodsAvailable === 'rentOnly') {
        updatedFilm.price = -1;
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
                                        updatedFilm.trending,
                                        updatedFilm.score,
                                        updatedFilm.country,
                                        updatedFilm.year,
                                        updatedFilm.purchaseMethodsAvailable,
                                        updatedFilm.comingSoon], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows[0]);
    });
});

//torna tutti gli ordini presenti nel database
router.get("/orders", (req, res) => {
    pool.query(queries.getAllOrdersQuery, (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});

export default router;