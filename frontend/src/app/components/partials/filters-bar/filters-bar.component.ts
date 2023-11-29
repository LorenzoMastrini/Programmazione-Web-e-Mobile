import { Component } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Genre } from 'src/app/shared/models/Genre';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.css']
})

export class FiltersBarComponent {
  genres?: Genre[];

  constructor(filmService:FilmService) {
    filmService.getAllGenres().subscribe(serverGenres => {
      this.genres = serverGenres;
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '€';
    }

    return `${value}`;
  }
}
