import { Injectable } from '@angular/core';
import { Film } from '../shared/models/Film';
import { sample_films, sample_genres } from 'src/data';
import { Genre } from '../shared/models/Genre';
import { HttpClient } from '@angular/common/http';
import { FILMS_BY_GENRE_URL, FILMS_BY_ID_URL, FILMS_BY_SEARCH_URL, FILMS_GENRES_URL, FILMS_URL } from '../shared/models/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  constructor(private http:HttpClient) { }

  //in futuro si connetterà al backend per scaricare i film disponibili
  getAll(): Observable<Film[]> {
    return this.http.get<Film[]>(FILMS_URL);
  }

  getAllFilmsBySearchTerm(searchTerm:string) {
    return this.http.get<Film[]>(FILMS_BY_SEARCH_URL + searchTerm);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(FILMS_GENRES_URL);
  }

  getAllFilmsByGenre(genre: string): Observable<Film[]> {
    return genre === "Tutti" ?
      this.getAll() :
      this.http.get<Film[]>(FILMS_BY_GENRE_URL + genre);
  }

  getFilmById(filmId: string): Observable<Film> {
    return this.http.get<Film>(FILMS_BY_ID_URL + filmId);
  }
  
/*
  getFilmsByFilters(genre:string, price:number,
                    purchaseMethod:string, fruitionMethod:string): Film[] {
    let films_list: Film[] = []; //lista dei film che rispettano tutti i filtri applicati
    
    //filtra rispetto al genere
    if(genre == "Tutti") {
      films_list = this.getAll();
    } else {
      films_list = this.getAll().filter(film => film.genres?.includes(genre));
    }

    //filtra rispetto al prezzo
    if(price == 0) {
      films_list = this.getAll().filter(film => film.price == 0); //gratuiti
    } else {
      films_list = this.getAll().filter(film => film.price >= price);
    }
    
    //filtra in base al metodo di acquisizione del prodotto (acquisto o noleggio)
    if(purchaseMethod == 'buy only') { //solo acquisto
      films_list = this.getAll().filter(film => film.rent == 0);
    }

    //filtra in base al metodo di fruizione (streaming o tramite supporto fisico)
    if(fruitionMethod == 'streaming only') { //solo streaming
      films_list = this.getAll().filter(film => film.fruitionMethod == 'streaming only');
    } else if(purchaseMethod == 'physical only') { //solo fisico
      films_list = this.getAll().filter(film => film.fruitionMethod == 'physical only');
    }

    return films_list;
  }
*/
}
