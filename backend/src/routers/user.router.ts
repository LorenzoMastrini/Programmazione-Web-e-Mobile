import { Router } from "express";
import { pool } from "../db";
import jwt from "jsonwebtoken"; //per generare token
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs"; //per cifrare la password e salvarla hashata nel database
import { User } from "../models/user.model";

const router = Router();
const queries = require('../queries');

//tramite post l'utente invia email e password nel corpo della richiesta per fare il login
router.post("/login", (req, res) => {
    const {email, password} = req.body; //destructuring assignment: destruttura il corpo e mette il contenuto in variabili separate
    
    //controlla se l'account esiste
    pool.query(queries.loginQuery, [email, password], (error:any, results:any) => {
        const user = results.rows[0]; //rows[0] perché altrimenti torna un array con solo user all'interno (l'email è unica nel db, quindi è inutile tornare un array)
        if(user) { //login andato a buon fine
            user["isAdmin"] = user["is_admin"]; //modifico il campo in camel case così che lo riesca a leggere anche il client
            return res.status(200).send(user);
        } else {
            res.status(HTTP_BAD_REQUEST).send("Email o password non validi");
        }
    });
});

//registrazione di un nuovo utente
router.post("/register", (req, res) => {
    const {name, email, password, address} = req.body; //destructuring assignment: destruttura il corpo e mette il contenuto in variabili separate
    
    //controlla se l'email già esiste nel database
    pool.query(queries.checkEmailExistsQuery, [email], async (error:any, results:any) => {
        const user = results.rows[0]; //rows[0] perché altrimenti torna un array con solo user all'interno (l'email è unica nel db, quindi è inutile tornare un array)
        if(user) { //email già esistente, quindi non posso registrare il nuovo utente
            res.status(HTTP_BAD_REQUEST).send("L'email inserita è già esistente nel database.");
            return; //NON esegue le istruzioni successive
        }

        //fase di registrazione del nuovo utente (arrivo qua solo se la mail non esiste già nel db)
        const encryptedPassword = await bcrypt.hash(password, 10); //critta la password (il secondo parametro è il salt)
        const newUser: User = {
            id: '', //inizializzato dal database in automatico
            name, //se nome della variabile e del campo dell'oggetto sono uguali basta scrivere così
            email,
            password: encryptedPassword,
            address,
            isAdmin: false,
            token: generateTokenResponse(email)
        }
        
        pool.query(queries.createUserQuery, [newUser.name, newUser.email, newUser.password, newUser.address, newUser.isAdmin], (error:any, results:any) => {
            if(error) throw error;
            res.status(201).send(generateTokenResponse(newUser));
        });
    });
});

//genera un token di sessione in base all'utente
const generateTokenResponse = (user:any) => {
    //il primo parametro è il payload, cioè ciò che voglio codificare
    //il secondo è una chiave privata (per semplicità è la stringa "SomeRandomText")
    //il terzo sono opzioni
    const token = jwt.sign({email: user.email},
        "SomeRandomText",
        {expiresIn: "30d"} //il token dura 30 giorni
    );

    user.token = token; //aggiunge il campo token all'oggetto user da tornare
    return user;
}

export default router;