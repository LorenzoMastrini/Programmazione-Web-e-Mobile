import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: ['./purchase-menu.component.css']
})

export class PurchaseMenuComponent implements AfterViewInit {
  @Input() //relazione padre-figlio tra componenti, per passare la variabile film dall'html
  cartItem!: CartItem;
  @Input() //relazione padre-figlio tra componenti, per passare la variabile film dall'html
  cart!: Cart;
  rent: 'Acquisto' | 'Noleggio' = 'Acquisto'; //dice se questo film viene comprato o noleggiato, in base al radio button selezionato dall'utente (all'inizio è impostato su "compra" per default)
  selectedItemKey: string = 'selectedItem';

  constructor(private cartService:CartService) { }

  ngAfterViewInit() {
    //mantiene le informazioni precedentemente selezionate anche se l'utente esce dalla pagina e poi rientra
    if(this.cartItem.purchaseMethod === 'Noleggio') {
      (document.getElementById("buy") as HTMLInputElement).checked = false;
      (document.getElementById("rent") as HTMLInputElement).checked = true;
    }
    
    let index = parseInt(localStorage.getItem(this.selectedItemKey) ?? "0") ?? 0;

    (document.getElementById("quantitySelectId") as HTMLSelectElement).options[index - 1].selected = true;
  }

  //metodo chiamato ogni volta che l'utente cambia la scelta dei radio button ("compra" o "noleggia")
  changeIdentificationType() {
    if(this.cartItem.purchaseMethod === 'Acquisto') {
      this.cartItem.purchaseMethod = 'Noleggio'; //inverte la selezione precedente
    } else {
      this.cartItem.purchaseMethod = 'Acquisto';
    }
    
    this.cartService.changeItemPrice(this.cartItem); //se si compra il film, la quantità di giorni del noleggio (secondo parametro) è 0
  }

  changeRentDays(rentDaysInString:string) {
    localStorage.setItem(this.selectedItemKey, (document.getElementById("quantitySelectId") as HTMLSelectElement).value);

    this.cartItem.rentDays = parseInt(rentDaysInString); //assegna il valore all'elemento nel carrello
    this.cartService.changeItemPrice(this.cartItem);
  }

  //metodo chiamato nell'html per calcolare e mostrare il costo totale del noleggio in base ai giorni
  getQuantityInt(quantityInString:string): number {
    return parseInt(quantityInString);
  }
}
