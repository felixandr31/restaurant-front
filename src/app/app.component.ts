import { Component } from '@angular/core';
import { UserService } from './services/data/user.service';

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
    }
    this.logged = !this.logged;
  }
}
