import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  films: Film[] = []; //mantiene i dati che otteniamo da FilmService

  constructor(private filmService: FilmService, activatedRoute: ActivatedRoute) {
    //ogni volta che 'params' cambia, chiama la funzione dentro 'subscribe()'
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) {
        this.films = this.filmService.getAllFilmsBySearchTerm(params.searchTerm);
      } else if(params.tag) {
        this.films = this.filmService.getAllFilmsByTag(params.tag);
      } else {
        this.films = filmService.getAll(); //se non è stato cercato nulla mostra tutto per default
      }
    });
  }
}
