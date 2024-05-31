import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(environment.apiUrl + '/vgshop/v1/categories');
  }

  register(body: any) {
    return this.http.post(environment.apiUrl + '/vgshop/v1/categories', body);
  }

  update(id: number, body: any) {
    return this.http.put(environment.apiUrl + '/vgshop/v1/categories/' + id, body);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/vgshop/v1/categories/' + id);
  }

}
