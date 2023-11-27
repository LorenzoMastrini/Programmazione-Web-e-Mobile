import express from "express";
import cors from "cors";
import { sample_films, sample_genres, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/films", (req, res) => {
    res.send(sample_films);
});

app.get("/api/films/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const films = sample_films.filter(film => film.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(films);
});

app.get("/api/films/genres", (req, res) => {
    res.send(sample_genres);
});

app.get("/api/films/genre/:genreName", (req, res) => {
    const genreName = req.params.genreName;
    const films = sample_films.filter(film => film.genres?.includes(genreName));
    res.send(films);
});

app.get("/api/films/:filmId", (req, res) => {
    const filmId = req.params.filmId;
    const film = sample_films.find(film => film.id == filmId);
    res.send(film);
});

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body; //destructuring assignment
    const user = sample_users.find(user =>
        user.email === email && user.password === password);

    if(user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Username o password non validi!");
    }
});

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({email: user.email, isAdmin: user.isAdmin},
        "SomeRandomText",
        {expiresIn: "30d"}
    );

    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});