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
import { AdminHomeComponent } from './components/pages/admin-home/admin-home.component';
import { AdminAddFilmComponent } from './components/pages/admin-add-film/admin-add-film.component';
import { AdminOrdersComponent } from './components/pages/admin-orders/admin-orders.component';
import { AdminModifyFilmComponent } from './components/pages/admin-modify-film/admin-modify-film.component';
import { ComingSoonPageComponent } from './components/pages/coming-soon-page/coming-soon-page.component';

const routes: Routes = [
  { path:"", component: HomeComponent }, //homepage dell'app
  { path:"search/:searchTerm", component: HomeComponent },
  { path:"film/:id", component: FilmPageComponent },
  { path:"cart-page", component: CartPageComponent },
  { path:"trend-page", component:ListPageComponent},
  { path:"discover-page", component:DiscoverPageComponent},
  { path:"discover-page/genres/:genre", component: DiscoverPageComponent },
  { path:"discover-page/price/:priceFilter", component: DiscoverPageComponent },
  { path:"discover-page/purchaseMethod/:purchaseMethodFilter", component: DiscoverPageComponent },
  { path:"coming-soon", component:ComingSoonPageComponent},
  { path:"login", component: LoginPageComponent },
  { path:"register", component: RegisterPageComponent },
  { path:"checkout", component: CheckoutPageComponent },
  { path:"confirm", component: ConfirmPageComponent },
  { path:"orders/:userToken", component: OrdersPageComponent },
  { path:"admin", component: AdminHomeComponent}, //homepage dell'app per un utente admin
  { path:"admin/add-film", component: AdminAddFilmComponent},
  { path:"admin/orders", component: AdminOrdersComponent},
  { path:"admin/films/modify/:id", component: AdminModifyFilmComponent},
  { path:"admin/orders", component: AdminOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
