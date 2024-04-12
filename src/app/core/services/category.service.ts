import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get('https://fdqkmpt6-8080.brs.devtunnels.ms/pizza-shop/v1/categories');
  }

}
