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
      } else if(params.genre) {
        filmsObservable = this.filmService.getAllFilmsByGenre(params.genre);
      } else if(params.priceFilter) {
        filmsObservable = this.filmService.getAllFilmsByPrice(params.priceFilter);
      } else if(params.purchaseMethodFilter) {
        filmsObservable = this.filmService.getAllFilmsByPurchaseMethod(params.purchaseMethodFilter);
      } else {
        filmsObservable = filmService.getAll(); //se non è stato cercato nulla mostra tutto per default
      }

      filmsObservable.subscribe((serverFilms) => {
        this.films = serverFilms;
      });
    });
  }


  orderBy(parameter: string) {
    switch(parameter) {
      case 'name': {
        this.films.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        break;
      }

      case 'priceBuy': {
        this.films.sort(function (a, b) {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
        break;
      }

      case 'priceRent': {
        this.films.sort(function (a, b) {
          if (a.priceRent < b.priceRent) {
            return -1;
          }
          if (a.priceRent > b.priceRent) {
            return 1;
          }
          return 0;
        });
        break;
      }

      case 'duration': {
        this.films.sort(function (a, b) {
          if (a.duration < b.duration) {
            return -1;
          }
          if (a.duration > b.duration) {
            return 1;
          }
          return 0;
        });
        break;
      }

      case 'rating': {
        this.films.sort(function (a, b) {
          if (a.score < b.score) {
            return -1;
          }
          if (a.score > b.score) {
            return 1;
          }
          return 0;
        });
        break;
      }
    }
  }
}
