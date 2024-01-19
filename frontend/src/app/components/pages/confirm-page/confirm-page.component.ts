import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})

export class ConfirmPageComponent {
  order: Order = new Order();

  constructor(orderService:OrderService,
              userService:UserService,
              private router:Router) {
    orderService.getNewOrderForCurrentUser(userService.currentUser).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        router.navigateByUrl('/checkout'); //non c'è un nuovo ordine, quindi redirigo l'utente alla pagina di checkout
      }
    })
  }

  returnToHomepage() {
    this.router.navigateByUrl('/');
  }
}
