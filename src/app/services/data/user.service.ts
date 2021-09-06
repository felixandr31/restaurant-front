import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

private url = 'http://localhost:8080/backend-filrouge/user/'

  constructor(private http: HttpClient) { }

  getUsers() {
    const url = this.url + 'users'
    return this.http.get(url, {observe: 'response'});
  }

  postUser(user: any) {
    const url = this.url + 'create'
    return this.http.post(url, user, {observe: 'response'});
  }

  //TODO putUser & deleteUser
}
