import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

//tramite l'interceptor posso intercettare tutte le richieste tra client e server e vedere tutte le richieste verso il server
//quindi voglio mostrare il caricamento quando c'è una richiesta e fermarlo quando tutte le richieste sono state completate
var pendingRequests = 0; //gestisco molteplici richieste per mostrare un unico caricamento fino a che non sono tutte completate

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading(); //mostro il caricamento appena viene intercettata una richiesta
    pendingRequests = pendingRequests + 1; 
    
    return next.handle(request).pipe(tap({
      next: (event) => {
        //se la richiesta è finita (e quindi ottengo una response)
        if(event.type === HttpEventType.Response) {
          this.handleHideLoading();
        }
      },
      error: (_) => {
        this.handleHideLoading();
      }
    }));
  }

  handleHideLoading() {
    pendingRequests = pendingRequests - 1;

    if(pendingRequests === 0) {
      this.loadingService.hideLoading(); //fine caricamento
    }
  }
}
