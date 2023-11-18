import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FilmService } from 'src/app/services/film.service';
import { Cart } from 'src/app/shared/models/Cart';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: ['./purchase-menu.component.css']
})

export class PurchaseMenuComponent {
  @Input() //relazione padre-figlio tra componenti, per passare la variabile film dall'html
  film!: Film;
  @Input() //relazione padre-figlio tra componenti, per passare la variabile film dall'html
  cart!: Cart;

  rent: boolean = false; //dice se questo film viene comprato o noleggiato, in base al radio button selezionato dall'utente (all'inizio è impostato su "compra" per default)

  constructor(activatedRoute:ActivatedRoute, filmService:FilmService, private cartService:CartService) {
    activatedRoute.params.subscribe((params) => {
      if(params.id) {
        this.film = filmService.getFilmById(params.id);
      }
    });
  }

  //metodo chiamato ogni volta che l'utente cambia la scelta dei radio button ("compra" o "noleggia")
  changeIdentificationType(event: any){
    this.rent = !this.rent; //inverte la selezione precedente

    //compra
    if(this.rent == false) {
      this.cartService.changeItemPrice(this.film.id, 0); //se si compra il film, la quantità di giorni del noleggio (secondo parametro) è 0
    }
  }

  changeRentDays(film:Film, rentDaysInString:string) {
    const rentDays = parseInt(rentDaysInString);
    this.cartService.changeItemPrice(film.id, rentDays);
  }

  //metodo chiamato nell'html per calcolare e mostrare il costo totale del noleggio in base ai giorni
  getQuantityInt(quantityInString:string): number {
    return parseInt(quantityInString);
  }

}
