import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: ['./purchase-menu.component.css']
})

export class PurchaseMenuComponent {
  @Input() //relazione padre-figlio tra componenti, per passare la vairabile film dall'html
  film!: Film;

  constructor(activatedRoute:ActivatedRoute, filmService:FilmService) {
    activatedRoute.params.subscribe((params) => {
      if(params.id) {
        this.film = filmService.getFilmById(params.id);
      }
    });
  }

  changeIdentificationType(event: any){
    console.log(event.target.value)
    this.film.rent = event.target.value;
  }
}
