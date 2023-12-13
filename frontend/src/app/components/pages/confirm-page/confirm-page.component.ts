import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(orderService:OrderService, private router:Router, private userService:UserService) {
    orderService.getNewOrderForCurrentUser(userService.currentUser).subscribe({
      next: (order) => {
        this.order = order;
        
        console.log(this.order);
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
