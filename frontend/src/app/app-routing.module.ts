import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FilmPageComponent } from './components/pages/film-page/film-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { ListPageComponent } from './components/pages/list-page/list-page.component';
import { DiscoverPageComponent } from './components/pages/discover-page/discover-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ConfirmPageComponent } from './components/pages/confirm-page/confirm-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';

const routes: Routes = [
  { path:"", component: HomeComponent }, //homepage dell'app
  { path:"search/:searchTerm", component: HomeComponent },
  { path:"film/:id", component: FilmPageComponent },
  { path:"cart-page", component: CartPageComponent },
  { path:"list-page", component:ListPageComponent},
  { path:"discover-page", component:DiscoverPageComponent},
  { path:"tag/:tag", component: DiscoverPageComponent },
  { path:"login", component: LoginPageComponent },
  { path:"register", component: RegisterPageComponent },
  { path:"checkout", component: CheckoutPageComponent },
  { path:"confirm", component: ConfirmPageComponent },
  { path:"orders/:userToken", component: OrdersPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
