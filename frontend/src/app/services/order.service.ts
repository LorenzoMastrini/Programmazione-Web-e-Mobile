import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDERS_URL, ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { INewOrder } from '../shared/interfaces/INewOrder';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  constructor(private http:HttpClient) { }

  create(order:INewOrder) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(currentUser:User): Observable<Order> {
    return this.http.post<Order>(ORDER_NEW_FOR_CURRENT_USER_URL, currentUser);
  }

  getAllOrders(userToken: string): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_URL + userToken);
  }
}
