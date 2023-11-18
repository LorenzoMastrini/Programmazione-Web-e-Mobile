import { Injectable } from '@angular/core';
import { Film } from '../shared/models/Film';
import { sample_films, sample_genres } from 'src/data';
import { Genre } from '../shared/models/Genre';

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  constructor() { }

  //in futuro si connetterà al backend per scaricare i film disponibili
  getAll(): Film[] {
    return sample_films;
  }

  getAllFilmsBySearchTerm(searchTerm:string) {
    return this.getAll().filter(film => film.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getAllGenres(): Genre[] {
    return sample_genres;
  }

  getAllFilmsByGenre(genre: string): Film[] {
    if(genre == "Tutti") {
      return this.getAll();
    } else {
      return this.getAll().filter(film => film.genres?.includes(genre));
    }
  }

  getFilmById(filmId: string): Film {
    return this.getAll().find(film => film.id == filmId) ?? new Film(); //se la prima parte torna undefined, il metodo ritorna un nuovo film
  }

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
}
