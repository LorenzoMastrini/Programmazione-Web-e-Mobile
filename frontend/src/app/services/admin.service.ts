import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ADMIN_ADD_FILM, ADMIN_DELETE_FILM, ADMIN_GET_ALL_ORDERS, ADMIN_MODIFY_FILM} from '../shared/constants/urls';
import { Film } from '../shared/models/Film';
import { IAdminAddFilm } from '../shared/interfaces/IAdminAddFilm';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http:HttpClient) { }

  addFilm(newFilm:IAdminAddFilm): Observable<Film> {
    return this.http.post<Film>(ADMIN_ADD_FILM, newFilm);
  }

  modifyFilm(updatedFilm:Film): Observable<Film> {
    return this.http.put<Film>(ADMIN_MODIFY_FILM + updatedFilm.id, updatedFilm);
  }

  deleteFilm(filmName:number): Observable<string>{
    return this.http.delete<string>(ADMIN_DELETE_FILM + filmName.toString());
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ADMIN_GET_ALL_ORDERS);
  }
}