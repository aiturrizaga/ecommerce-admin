import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get('https://vgshop-api.onrender.com/vgshop/v1/categories');
  }

  register(body: any) {
    return this.http.post('https://vgshop-api.onrender.com/vgshop/v1/categories', body);
  }

  update(id: number, body: any) {
    return this.http.put('https://vgshop-api.onrender.com/vgshop/v1/categories/' + id, body);
  }

}
