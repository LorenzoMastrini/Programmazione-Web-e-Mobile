import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-coming-soon-page',
  templateUrl: './coming-soon-page.component.html',
  styleUrls: ['./coming-soon-page.component.css']
})

export class ComingSoonPageComponent {
  films: Film[] = []; //mantiene i dati che otteniamo da FilmService

  constructor(filmService: FilmService,
              activatedRoute: ActivatedRoute) {
    let filmsObservable: Observable<Film[]>; //per ottere gli observable di tutti i metodi chiamati che si connettono al backend; poi faccio un unico subscribe per ottere i film, invece che fare un subscribe per ogni metodo
    
    //ogni volta che 'params' cambia, chiama la funzione dentro 'subscribe()'
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) {
        filmsObservable = filmService.getAllFilmsBySearchTerm(params.searchTerm);
      } else {
        filmsObservable = filmService.getAll(); //se non è stato cercato nulla mostra tutto per default
      }

      filmsObservable.subscribe((serverFilms) => {
        this.films = serverFilms;
      });
    });
  }
}
