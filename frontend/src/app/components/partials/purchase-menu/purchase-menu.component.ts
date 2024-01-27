import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: ['./purchase-menu.component.css']
})

export class PurchaseMenuComponent {
  @Input() //relazione padre-figlio tra componenti, per passare la variabile film dall'html
  cartItem!: CartItem;
  @Input() //relazione padre-figlio tra componenti, per passare la variabile film dall'html
  cart!: Cart;
  rent: 'Acquisto' | 'Noleggio' = 'Acquisto'; //dice se questo film viene comprato o noleggiato, in base al radio button selezionato dall'utente (all'inizio è impostato su "compra" per default)
  selectedItemKey: string = 'selectedItem';

  constructor(private cartService:CartService) {}

  ngAfterViewInit() {
    this.cartService.changeItemPrice(this.cartItem, 'Acquisto');
  }
/*
  ngAfterViewInit() {
    //mantiene le informazioni precedentemente selezionate anche se l'utente esce dalla pagina e poi rientra
    if(this.cartItem.purchaseMethod === 'Noleggio') {
      (document.getElementById("buy") as HTMLInputElement).checked = false;
      (document.getElementById("rent") as HTMLInputElement).checked = true;
    }
    
    let index = parseInt(localStorage.getItem(this.selectedItemKey) ?? "0") ?? 0;

    (document.getElementById("quantitySelectId") as HTMLSelectElement).options[index - 1].selected = true;
  }
*/
  //metodo chiamato ogni volta che l'utente cambia la scelta dei radio button ("compra" o "noleggia")
  changePurchaseMethod() {
    //in base al bottone precedentemente selezionato, inverte la selezione
    switch(this.cartItem.purchaseMethod) {
      case 'Acquisto': {
        this.cartService.changeItemPrice(this.cartItem, 'Noleggio');
        break;
      }
      case 'Noleggio': {
        this.cartItem.purchaseMethod = 'Acquisto';
        this.cartService.changeItemPrice(this.cartItem, 'Acquisto');
        break;
      }
    }
  }
}
