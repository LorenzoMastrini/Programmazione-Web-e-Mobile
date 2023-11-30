import express from "express"; //per creare la web application
import cors from "cors"; //solo per lo sviluppo, perché abbiamo server e client entrambi sul localhost con porte diverse
import filmRouter from './routers/film.router';
import userRouter from "./routers/user.router";


//const filmRoutes = require('./film/routes');


const app = express(); //ora l'app è un'applicazione express, per definire le APIs
app.use(express.json()); //express non usa il json per default, devo specificarlo manualmente
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"] //questo è il client da dove arrivano le richieste
}));


//app.use('/api/v1/films', filmRoutes);


app.use("/api/films", filmRouter)
app.use("/api/users", userRouter);

const port = 5000; //porta su cui il server ascolta
app.listen(port, () => { //funzione chiamata quando il processo di ascolto termina
    console.log("Website served on http://localhost:" + port);
});