import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/shared/models/Film';

@Component({
  selector: 'app-admin-modify-film',
  templateUrl: './admin-modify-film.component.html',
  styleUrls: ['./admin-modify-film.component.css']
})

export class AdminModifyFilmComponent implements OnInit {
  film!: Film;
  modifyFilmForm!: FormGroup;
  isSubmitted = false; //per indicare se l'utente ha premuto o meno il pulsante per il submit, per non mostrare subito gli errori di validazione dei dati

  constructor(private activatedRoute:ActivatedRoute,
              private filmService:FilmService,
              private formBuilder:FormBuilder,
              private router:Router,
              private adminService:AdminService) { }

//INIZIALIZZAZIONE NEL CONSTRUTTORE MA UNDEFINED NELL'NGONINIT()

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params.id) {
        this.filmService.getFilmById(params.id).subscribe(serverFilm => {
          this.film = serverFilm;
          let {name, duration, genres, director, plot, imageUrl, year, origins, score, favorite, price, rentable, priceRent} = this.film;

          //tramite formBuilder creo il form group per i vari campi che l'utente dovrà compilare
          this.modifyFilmForm = this.formBuilder.group({
            //qui definisco tutti gli input e i loro validators 
            //il primo valore di entrambi è il valore di default, e il secondo sono i validators
            name: [name, Validators.required],
            duration: [duration, Validators.required],
            genres: [genres?.toString(), Validators.required],
            director: [director, Validators.required],
            plot: [plot, Validators.required],
            imageUrl: [imageUrl, Validators.required],
            year: [year, Validators.required],
            origins: [origins, Validators.required],
            score: [score, Validators.required],
            favorite: [favorite, Validators.required],
            price: [price, Validators.required],
            rentable: [rentable, Validators.required],
            priceRent: [priceRent, Validators.required]
          });
        });
      }
    });
  }

  //solo per accorciare le chiamate nell'html: fc.email al posto di loginForm.controls.email
  get fc() {
    return this.modifyFilmForm.controls;
  }
  
  
  submit() {
    this.isSubmitted = true;

    if(this.modifyFilmForm.invalid) {
      return; //torna se il form non è valido
    }

    this.adminService.modifyFilm({
                                id: this.film.id, //non viene mai aggiornato dall'amministratore perché viene gestito dal database
                                name: this.fc.name.value,
                                duration: this.fc.duration.value,
                                genres: this.stringToArrayOfStrings(this.fc.genres.value),
                                director: this.fc.director.value,
                                plot: this.fc.plot.value,
                                imageUrl: this.fc.imageUrl.value,
                                year: this.fc.year.value,
                                origins: this.stringToArrayOfStrings(this.fc.origins.value),
                                score: this.fc.score.value,
                                favorite: this.fc.favorite.value,
                                price: this.fc.price.value,
                                rentable: this.fc.rentable.value,
                                priceRent: this.fc.priceRent.value
    }).subscribe((serverNewFilm: Film) => {
      console.log(serverNewFilm);
    });

    this.router.navigateByUrl("/admin"); //torna alla home dell'admin
  }

  //converte laa stringa presa in input in un array di stringhe così che venga passato correttamente al server
  stringToArrayOfStrings(string: string): string[] {
    let stringArray: string[] = [];
    if(string.includes(",")) {
      stringArray = string.split(", ");
    } else {
      stringArray.push(string);
    }
  
    return stringArray;
  }
}
