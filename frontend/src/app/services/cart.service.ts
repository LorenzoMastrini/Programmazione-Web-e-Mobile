import { Injectable } from '@angular/core';
import { Cart } from '../shared/Cart';
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
  
    if(cartItem) {
      return;
    }
    
    this.cart.items.push(new CartItem(film));

    this.setCartToLocalStorage();
  }

  removeFromCart(filmId:string): void {
    this.cart.items = this.cart.items.filter(item => item.film.id != filmId);
  
    this.setCartToLocalStorage();
  }

  changeQuantity(filmId:string, quantity:number) {
    let cartItem = this.cart.items.find(itme => itme.film.id === filmId);

    if(!cartItem) {
      return;
    }

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.film.price;
  
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
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0); //0 è il valore di default di prevSum all'inizio
    const cartJson = JSON.stringify(this.cart);

    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
