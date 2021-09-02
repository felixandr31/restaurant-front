import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  rolesUrl = 'http://localhost:8080/backend-filrouge/role/roles'
  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get(this.rolesUrl, {observe:"response"});
  }
}
