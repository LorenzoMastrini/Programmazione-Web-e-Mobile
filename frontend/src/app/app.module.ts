import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { FilmPageComponent } from './components/pages/film-page/film-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { SideBarComponent } from './components/partials/side-bar/side-bar.component';
import { ListPageComponent } from './components/pages/list-page/list-page.component';
import { DiscoverPageComponent } from './components/pages/discover-page/discover-page.component';
import { FiltersBarComponent } from './components/partials/filters-bar/filters-bar.component';
import { MatSliderModule } from '@angular/material/slider';
import { PurchaseMenuComponent } from './components/partials/purchase-menu/purchase-menu.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FilmPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    SideBarComponent,
    ListPageComponent,
    DiscoverPageComponent,
    FiltersBarComponent,
    PurchaseMenuComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    //RatingModule
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
