import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Film } from '../shared/models/Film';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(film:Film): void {
    let cartItem = this.cart.items.find(item => item.film.id === film.id);
  
    if(cartItem) { //se il film era già nel carrello non lo aggiunge
      return;
    }
    
    this.cart.items.push(new CartItem(film));

    this.setCartToLocalStorage();
  }

  removeFromCart(filmId:string): void {
    this.cart.items = this.cart.items.filter(item => item.film.id != filmId);
  
    this.setCartToLocalStorage();
  }

  rent(filmId:string, rent:boolean, days:number) {
    let cartItem = this.cart.items.find(item => item.film.id === filmId);

    if(!cartItem) {
      return;
    }

    cartItem.rent = rent;
    cartItem.price = days * cartItem.film.price_rent;
  
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
  
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    //così ogni cambiamento al carrello avviene solo all'initerno del cartService, mai fuori
    return this.cartSubject.asObservable();
  }

  //usiamo localStorage per impedire che le informazioni vadano perse ad ogni refresh della pagina
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0); //0 è il valore di default di prevSum all'inizio
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + 1, 0); //0 è il valore di default di prevSum all'inizio
    const cartJson = JSON.stringify(this.cart); //rappresentazione in stringa json del carrello

    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart); //notifica tutti quelli che stavano osservando il carrello appena questo cambia
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart(); //se non esiste già un carrello, ne ritorna uno nuovo
  }
}
