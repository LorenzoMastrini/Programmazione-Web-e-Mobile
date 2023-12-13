import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})

export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(cartService:CartService,
              private formBuilder:FormBuilder,
              private userService:UserService, //per aggiungere nome e indirizzo dell'utente al form
              private toastrService:ToastrService,
              private orderService:OrderService,
              private router:Router) {
    const cart = cartService.getCart(); //ottengo l'ultimo valore dell'observable
    this.order.orderItems = cart.items;

    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    //campi iniziali del form con valori di default in base all'utente
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  //come per il form di login serve solo a facilitare l'accesso ai controlli del form
  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if(this.checkoutForm.invalid) {
      //form non valido, in base ai controlli dei vari campi
      this.toastrService.warning("Per favore riempi i campi", "Input non validi");
      return; //non prosegue oltre
    }

    //form valido, quindi imposto i valori dell'oggetto ordine
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
    this.order.userId = parseInt(this.userService.currentUser.id);

    this.orderService.create(this.order).subscribe({
      next: () => {
        console.log("funge");
        this.router.navigateByUrl('/confirm');
      },
      error:(errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Carrello');
      }
    });
  }
}