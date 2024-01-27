import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent {
  films: Film[] = [];

  constructor(filmService: FilmService,
              activatedRoute: ActivatedRoute,
              private adminService:AdminService) {
    activatedRoute.params.subscribe(() => {
      filmService.getAll().subscribe((serverFilms) => {
        this.films = serverFilms;
      });; //se non è stato cercato nulla mostra tutto per default
    });
  }

  deleteFilm(filmId:number) {
    this.adminService.deleteFilm(filmId).subscribe(() => {
      window.location.reload(); //refresh della pagina per mostrare le informazioni aggiornate
    });
  }
}