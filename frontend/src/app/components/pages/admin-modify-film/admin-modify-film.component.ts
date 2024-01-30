import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/shared/models/Film';
import { Genre } from 'src/app/shared/models/Genre';

@Component({
  selector: 'app-admin-modify-film',
  templateUrl: './admin-modify-film.component.html',
  styleUrls: ['./admin-modify-film.component.css']
})

export class AdminModifyFilmComponent implements AfterViewInit {
  genres!: Genre[];
  film!: Film;
  modifyFilmForm!: FormGroup;
  isSubmitted = false; //per indicare se l'utente ha premuto o meno il pulsante per il submit, per non mostrare subito gli errori di validazione dei dati
  purchaseMethodsAvailable!: string;

  constructor(private activatedRoute:ActivatedRoute,
              private filmService:FilmService,
              private formBuilder:FormBuilder,
              private router:Router,
              private adminService:AdminService) {}


  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params.id) {
        //prende la lista di tutti i generi
        this.filmService.getAllGenres().subscribe(serverGenres => {
          this.genres = serverGenres;
          //li ordina in ordine alfabetico
          this.genres.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          this.filmService.getFilmById(params.id).subscribe(serverFilm => {
            this.film = serverFilm;
            let {name, duration, director, plot, imageUrl, year, country, score, trending, price, purchaseMethodsAvailable, priceRent} = this.film;
  
            //tramite formBuilder creo il form group per i vari campi che l'utente dovrà compilare
            this.modifyFilmForm = this.formBuilder.group({
              //qui definisco tutti gli input e i loro validators 
              //il primo valore di entrambi è il valore di default, e il secondo sono i validators
              name: [name, Validators.required],
              duration: [duration, Validators.required],
              genres: new FormArray([]), //è una lista di stringhe quindi uso FormArray
              director: [director, Validators.required],
              plot: [plot, Validators.required],
              imageUrl: [imageUrl, Validators.required],
              year: [year, Validators.required],
              country: [country, Validators.required],
              score: [score, Validators.required],
              trending: [trending, Validators.required],
              price: [price, Validators.required],
              purchaseMethodsAvailable: [purchaseMethodsAvailable, Validators.required],
              priceRent: [priceRent, Validators.required]
            });
  
            this.addCheckboxes(); //riempe il campo genres con tutti i generi nel database e seleziona i checkbox che corrispondono ai generi già presenti in un film
          });
        });
      }
    });
  }


  private addCheckboxes() {
    this.genres.forEach(genre => {
      this.genresFormArray.push(new FormControl(this.film.genres?.includes(genre.name)));
    });
  }


  //solo per accorciare le chiamate nell'html: fc.email al posto di loginForm.controls.email
  get fc() {
    return this.modifyFilmForm.controls;
  }

  get fcTrending() {
    return this.modifyFilmForm.controls.trending as FormControl; //non posso fare questa conversione nell'HTML
  }

  get fcPurchaseMethodsAvailable() {
    return this.modifyFilmForm.controls.purchaseMethodsAvailable as FormControl; //non posso fare questa conversione nell'HTML
  }

  get genresFormArray() {
    return this.modifyFilmForm.controls.genres as FormArray;
  }
  
  
  changeMethods(methods:string) {
    this.purchaseMethodsAvailable = methods;
  }


  submit() {
    this.isSubmitted = true;

    if(this.modifyFilmForm.invalid) {
      return; //torna se il form non è valido
    }

    //mappa i valori delle checkbox a true con i corrispondenti generi e filtra quelli esistenti, cioè le checkbox attive
    const selectedGenres = this.modifyFilmForm.value.genres.map((v:any, i:any) => v ? this.genres[i].name : null).filter((v:any) => v !== null);

    this.adminService.modifyFilm({id: this.film.id, //non viene mai aggiornato dall'amministratore perché viene gestito dal database
                                  name: this.fc.name.value,
                                  duration: this.fc.duration.value,
                                  genres: selectedGenres,
                                  director: this.fc.director.value,
                                  plot: this.fc.plot.value,
                                  imageUrl: this.fc.imageUrl.value,
                                  year: this.fc.year.value,
                                  country: this.fc.country.value,
                                  score: this.fc.score.value,
                                  trending: this.fc.trending.value,
                                  price: this.fc.price.value,
                                  purchaseMethodsAvailable: this.fc.purchaseMethodsAvailable.value,
                                  priceRent: this.fc.priceRent.value,
                                  comingSoon: false
    }).subscribe();

    this.router.navigateByUrl("/admin"); //torna alla home dell'admin
  }
}
