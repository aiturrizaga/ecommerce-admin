import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order, SaveOrder } from '../interfaces/order';
import { Page } from "../interfaces/page";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<Page<Order>>(`${ environment.apiUrl }/vgshop/v1/orders`);
  }

  register(body: SaveOrder) {
    return this.http.post(`${ environment.apiUrl }/vgshop/v1/orders`, body);
  }
}
