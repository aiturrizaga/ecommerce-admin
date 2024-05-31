import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll() {
    console.log('API URL:', environment.apiUrl);
    // environment.apiUrl + '/vgshop/v1/products'
    return this.http.get(`${environment.apiUrl}/vgshop/v1/products`);
  }

  register(body: any) {
    return this.http.post(`${environment.apiUrl}/vgshop/v1/products`, body);
  }

  update(id: number, body: any) {
    return this.http.put(`${environment.apiUrl}/vgshop/v1/products/${id}`, body);
  }

  delete(id: number) {
    // environment.apiUrl + '/vgshop/v1/products/' + id
    return this.http.delete(`${environment.apiUrl}/vgshop/v1/products/${id}`);
  }
}
