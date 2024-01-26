import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { Genre } from 'src/app/shared/models/Genre';

@Component({
  selector: 'filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.css']
})

export class FiltersBarComponent {
  genres?: Genre[];
  @Output()
  orderByParameter = new EventEmitter<string>();

  constructor(filmService:FilmService,
              private router:Router) {
    filmService.getAllGenres().subscribe(serverGenres => {
      this.genres = serverGenres;
      this.genres.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    });
  }

  sendOrderByParameterToParent(parameter:string) {
    this.orderByParameter.emit(parameter);
  }

  changePriceFilter(event: Event) {
    let priceFilter = (event.target as HTMLInputElement).value;
    this.router.navigateByUrl("/discover-page/price/" + priceFilter);
  }

  changePurchaseMethodFilter(event: Event) {
    let purchaseMethodFilter = (event.target as HTMLInputElement).value;
    this.router.navigateByUrl("/discover-page/purchaseMethod/" + purchaseMethodFilter);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '€';
    }

    return `${value}`;
  }
}
