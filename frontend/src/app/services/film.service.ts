import { Injectable } from '@angular/core';
import { Film } from '../shared/models/Film';
import { sample_films, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';

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

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFilmsByTag(tag: string): Film[] {
    if(tag == "All") {
      return this.getAll();
    } else {
      return this.getAll().filter(film => film.tags?.includes(tag));
    }
  }

  getFilmById(filmId: string): Film {
    return this.getAll().find(film => film.id == filmId) ?? new Film(); //se la prima parte torna undefined, il metodo ritorna un nuovo film
  }
}
