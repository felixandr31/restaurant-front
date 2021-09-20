import { Component } from '@angular/core';
import { UserService } from './services/data/user.service';

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

  constructor(private userService: UserService) {
  }

  public showView = "";
  public showSubView = 'eat';
  public logged = false;
  // public showSubView = 'eat';

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
}
