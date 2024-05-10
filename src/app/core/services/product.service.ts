import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get('https://vgshop-api.onrender.com/vgshop/v1/products');
  }

  register(body: any) {
    return this.http.post('https://vgshop-api.onrender.com/vgshop/v1/products', body);
  }

  update(id: number, body: any) {
    return this.http.put('https://vgshop-api.onrender.com/vgshop/v1/products/' + id, body);
  }

  delete(id: number) {
    return this.http.delete('https://vgshop-api.onrender.com/vgshop/v1/products/' + id);
  }
}
