import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //per la connessione al backend
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
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

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
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
    //RatingModule
    HttpClientModule,
    ReactiveFormsModule, //per usare loginForm dentro l'html
    ToastrModule.forRoot({ //configurazione parametri globali per questo progetto
      timeOut:3000, //i messaggi durano 3 secondi
      positionClass:'toast-bottom-right', //i messaggi compaiono in basso a destra
      newestOnTop:false //i nuovi messaggi compaiono dal basso e spingono verso l'alto i precedenti
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
