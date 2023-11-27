import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css']
})
export class DiscoverPageComponent {
  films: Film[] = []; //mantiene i dati che otteniamo da FilmService

  constructor(private filmService: FilmService, activatedRoute: ActivatedRoute) {
    let filmsObservable: Observable<Film[]>;
    
    //ogni volta che 'params' cambia, chiama la funzione dentro 'subscribe()'
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) {
        filmsObservable = this.filmService.getAllFilmsBySearchTerm(params.searchTerm);
      } else if(params.tag) {
        filmsObservable = this.filmService.getAllFilmsByGenre(params.tag);
      } else {
        filmsObservable = filmService.getAll(); //se non è stato cercato nulla mostra tutto per default
      }

      filmsObservable.subscribe((serverFilms) => {
        this.films = serverFilms;
      });
    });
  }
}
