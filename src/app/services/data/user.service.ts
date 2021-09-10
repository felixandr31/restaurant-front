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

  addFriend(id, friend) {
    const url = this.url + 'addfriends/' + id
    return this.http.post(url, friend, {observe: 'response'})
  }

  removeFriend(id, friend) {
    const url = this.url + 'removefriends/' + id
    return this.http.post(url, friend, {observe:'response'})
  }

  realLogin(credentials) {
    const url = this.url + 'login/'
    return this.http.post(url, credentials, {observe: 'response'})
  }

  updateUser(id, user){
    const url = this.url + 'update/' + id
    return this.http.put(url, user, {observe: 'response'});
  }

  deleteUser(id){
    const url = this.url + 'delete/' + id
    return this.http.delete(url, {observe: 'response'});
  }

  addRoles(userId, roleIds: Set<String>){
    const url = this.url + 'addroles/' + userId
    return this.http.post(url, roleIds, {observe: 'response'});
  }

  removeRoles(userId, roleIds: Set<String>){
    const url = this.url + 'removeroles/' + userId
    return this.http.post(url, roleIds, {observe: 'response'});
  }

  //TODO getRestaurantByClientId
}
