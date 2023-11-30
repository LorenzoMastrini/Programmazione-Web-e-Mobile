import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken"; //per generare token

const router = Router();

//trsmite post l'utente invia email e password nel corpo della richiesta per fare il login
router.post("/login", (req, res) => {
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

export default router;