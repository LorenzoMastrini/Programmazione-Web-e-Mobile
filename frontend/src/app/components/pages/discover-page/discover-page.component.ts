import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    //ogni volta che 'params' cambia, chiama la funzione dentro 'subscribe()'
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) {
        this.films = this.filmService.getAllFilmsBySearchTerm(params.searchTerm);
      } else if(params.tag) {
        this.films = this.filmService.getAllFilmsByGenre(params.tag);
      } else {
        this.films = filmService.getAll(); //se non è stato cercato nulla mostra tutto per default
      }
    });
  }
}
