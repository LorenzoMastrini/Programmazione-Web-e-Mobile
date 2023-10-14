import { Injectable } from '@angular/core';
import { Film } from '../shared/models/Film';
import { sample_films } from 'src/data';

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  constructor() { }

  //in futuro si connetterà al backend per scaricare i film disponibili
  getAll(): Film[] {
    return sample_films;
  }
}
