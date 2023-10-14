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

  constructor(private filmService: FilmService) {
    this.films = filmService.getAll();
  }
}
