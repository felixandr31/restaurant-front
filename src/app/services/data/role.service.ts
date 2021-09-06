import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  private rolesUrl = 'http://localhost:8080/backend-filrouge/role/'

  constructor(private http: HttpClient) { }

  getRoles() {
    const url = this.rolesUrl + 'roles'
    return this.http.get(url, {observe:'response'});
  }

  postRole(role: any) {
    const url = this.rolesUrl + 'create'
    return this.http.post(url, role, {observe: 'response'} )
  }

  //TODO putRole & deleteRole
  putRole(role: any) {
    const url = this.rolesUrl + ''
  }

  deleteRole(role: any) {
    const url = this.rolesUrl + ''
    return this.http.delete(url)
  }
}
