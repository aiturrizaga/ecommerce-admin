import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Page } from '../interfaces/page';
import { Person, PersonAddress } from '../interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Page<Person>>(`${environment.apiUrl}/vgshop/v1/users`);
  }

  getAddressById(id: number) {
    return this.http.get<PersonAddress[]>(`${environment.apiUrl}/vgshop/v1/addresses/users/${id}`);
  }

}
