import { Injectable } from '@angular/core';
import { Film } from '../shared/models/Film';
import { Genre } from '../shared/models/Genre';
import { HttpClient } from '@angular/common/http';
import { FILMS_BY_GENRE_URL, FILMS_BY_ID_URL, FILMS_BY_SEARCH_URL, FILMS_GENRES_URL, FILMS_URL } from '../shared/constants/urls';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilmService {
  constructor(private http:HttpClient) { }

  //l'HttpClient non invierà i dati raw di tipo 'Film' ma un Observable su cui devo fare subscribe;
  //dopo che la connessione al backend sarà finita, questo fornirà i dati o tornerà un errore
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
    return this.http.get<Film>(FILMS_BY_ID_URL + filmId).pipe(
        tap(_ => console.log('fetched film id = ' + filmId)),
        catchError(this.handleError<Film>('getFilmById id = ' + filmId))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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
