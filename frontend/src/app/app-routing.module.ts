import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FilmPageComponent } from './components/pages/film-page/film-page.component';

const routes: Routes = [
  { path:"", component: HomeComponent }, //homepage dell'app
  { path:"search/:searchTerm", component: HomeComponent },
  { path:"tag/:tag", component: HomeComponent },
  { path:"film/:id", component: FilmPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
