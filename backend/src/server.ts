import express from "express"; //per creare la web application
import cors from "cors"; //solo per lo sviluppo, perché abbiamo server e client entrambi sul localhost con porte diverse
import { sample_films, sample_genres, sample_users } from "./data";
import jwt from "jsonwebtoken"; //per generare token

const app = express(); //ora l'app è un'applicazione express, per definire le APIs
app.use(express.json()); //express non usa il json per default, devo specificarlo manualmente
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"] //questo è il client da dove arrivano le richieste
}));

//torna tutti i film
app.get("/api/films", (req, res) => {
    res.send(sample_films);
});

//torna i film in base alla ricerca
app.get("/api/films/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    //filtra in base al termine di ricerca, ignorando le maiuscole
    const films = sample_films.filter(film => film.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(films);
});

//torna tutti i generi
app.get("/api/films/genres", (req, res) => {
    res.send(sample_genres);
});

//torna i film in base al genere
app.get("/api/films/genre/:genreName", (req, res) => {
    const genreName = req.params.genreName;
    const films = sample_films.filter(film => film.genres?.includes(genreName));
    res.send(films);
});

//torna i film in base all'id, per visualizzare la pagina del singolo film
app.get("/api/films/:filmId", (req, res) => {
    const filmId = req.params.filmId;
    const film = sample_films.find(film => film.id == filmId);
    res.send(film);
});

//trsmite post l'utente invia email e password nel corpo della richiesta per fare il login
app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body; //destructuring assignment: destruttura il corpo e mette il contenuto in variabili separate
    const user = sample_users.find(user =>
        user.email === email && user.password === password);

    if(user) { //utente disponibile
        //il token è un testo criptato inviato al client e da lui memorizzato così che lo riinvia ad ogni richiesta, per autenticazione e autorizzazione
        res.send(generateTokenResponse(user));
    } else { //utente non trovato
        res.status(400).send("Username o password non validi!");
    }
});

//genera un token in base all'utente
const generateTokenResponse = (user:any) => {
    //il primo parametro è il payload, cioè ciò che voglio codificare
    //il secondo è una chiave privata (per semplicità è la stringa "SomeRandomText")
    //il terzo sono opzioni
    const token = jwt.sign({email: user.email, isAdmin: user.isAdmin},
        "SomeRandomText",
        {expiresIn: "30d"} //il token dura 30 giorni
    );

    user.token = token;
    return user;
}

const port = 5000; //porta su cui il server ascolta
app.listen(port, () => { //funzione chiamata quando il processo di ascolto termina
    console.log("Website served on http://localhost:" + port);
});