import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-rent-menu',
  templateUrl: './rent-menu.component.html',
  styleUrls: ['./rent-menu.component.css']
})

export class RentMenuComponent {
  film!: Film;
  
  constructor(activatedRoute:ActivatedRoute, filmService:FilmService) {
      activatedRoute.params.subscribe((params) => {
      if(params.id) {
        this.film = filmService.getFilmById(params.id);
      }
    });
  }
}
