import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false); //tutte le classi che usano il servizio saranno informate sullo stato del caricamento

  constructor() { }

  //pagina di caricamento
  showLoading() {
    this.isLoadingSubject.next(true);
  }

  //fine caricamento
  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  //dato che isLoadingSubject è private uso un metodo getter
  get isLoading() {
    return this.isLoadingSubject.asObservable(); //torna un observable così che sia impossibile modificarlo fuori dal servizio 
  }
}
