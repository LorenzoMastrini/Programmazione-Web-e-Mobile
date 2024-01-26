import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  searchTerm = "";

  constructor(activatedRoute:ActivatedRoute, private router:Router) { //router è accessibile da tutta la classe
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) {
        this.searchTerm = params.searchTerm;
      }
    });
  }

  search(term:string): void {
    if(term === '') {
      this.router.navigateByUrl("/");
    }
    if(term) {
      this.router.navigateByUrl("/search/" + term);
    }
  }
}
