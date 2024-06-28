import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get(`${environment.apiUrl}/vgshop/v1/orders`);
  }

  register(body: any) {
    return this.http.post(`${environment.apiUrl}/vgshop/v1/orders`, body);
  }
}
