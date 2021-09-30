import { Component } from '@angular/core';
import { UserService } from './services/data/user.service';
import { RoleService } from './services/data/role.service';

export const OK = 202;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant-front';

  public user: any = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roles: [],
    friends: []
  }
  public availableRoles: any;

  constructor(private userService: UserService, private roleService: RoleService) {

  }

  public showView = "Default";
  public showSubView = 'eat';
  public logged = false;

  selectedView(event) {
    this.showView = event;
  }

  updateSubView(event) {
    this.showSubView = event;
  }

  changeLogStatus(event) {
    if (this.logged) {
      this.user = {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        roles: [],
        friends: []
      }
      this.user = {...this.user}
    } else {
      this.user = event
      this.user = {...this.user}
      console.log('user logged', this.user)
      this.refreshRoles()
    }
    this.logged = !this.logged;
  }

  refreshUser() {
    this.userService.getUsers().subscribe(
      data => {
        const res = Object.values(data.body)
        const user = res.find(user => user.id === this.user.id)
        console.log('user refreshed', user)
        return this.user = Object.assign({}, user)
      }
    )
  }

  refreshRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.availableRoles = Object.assign([], data.body)
      }
    )
  }
}
