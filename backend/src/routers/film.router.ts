import { Router } from 'express';
import { pool } from "../db";

const router = Router();
const queries = require('../queries');

//torna tutti i film
router.get("/", (req, res) => {
    pool.query(queries.getAllQuery, (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});

//torna i film in base alla ricerca
router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    pool.query(queries.getFilmBySearchTermQuery, [searchTerm], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows); //rows[0] per inviare solo la prima riga, tanto l'id è univoco per ogni film
    });
});

//torna tutti i generi
router.get("/genres", (req, res) => {
    pool.query(queries.getAllGenresQuery, (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});

//torna i film in base al genere
router.get("/genre/:genreName", (req, res) => {
    const genreName = req.params.genreName;
    pool.query(queries.getAllFilmsByGenreQuery, [genreName], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});

//torna i film in base alla fascia di prezzo
router.get("/price/:priceFilter", (req, res) => {
    //la stringa è nella forma 'n1-n2'
    const minPrice = parseInt(req.params.priceFilter.split('-')[0]); //divide la stringa rispetto a '-' e prende separatamente le due sottostringhe rimanenti (i due numeri)
    const maxPrice = parseInt(req.params.priceFilter.split('-')[1]);
    
    pool.query(queries.getAllFilmsByPriceQuery, [minPrice, maxPrice], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});

//torna i film in base ai metodi d'acquisto disponibili
router.get("/purchaseMethod/:purchaseMethodFilter", (req, res) => {
    //la stringa è nella forma 'n1-n2'
    const purchaseMethod = req.params.purchaseMethodFilter;
    
    pool.query(queries.getAllFilmsByPurchaseMethodQuery, [purchaseMethod], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
});

//torna i film in base all'id, per visualizzare la pagina del singolo film
router.get("/:filmId", (req, res) => {
    const filmId = parseInt(req.params.filmId);
    pool.query(queries.getFilmByIdQuery, [filmId], (error:any, results:any) => {
        if(error) throw error;
        res.status(200).json(results.rows[0]); //rows[0] per inviare solo la prima riga, tanto l'id è univoco per ogni film
    });
});

export default router;