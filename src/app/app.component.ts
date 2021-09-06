import { Component } from '@angular/core';
import { UserService } from './services/data/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant-front';
  public user: any;

  constructor(private userService: UserService) {
    this.user = this.userService.getUsers().subscribe(
      data => {
        let res = Object.values(data.body)
        this.user = res.filter(user => user.id === '6135e681309dfa211d060bc5').shift();
        this.user = Object.assign({}, this.user);
        return this.user;
      }
    )
  }
  public showView = "";
  public showSubView = 'eat';
  // public showSubView = 'eat';

  selectedView(event){
      this.showView = event;
  }

  updateSubView(event) {
    this.showSubView = event;
  }
}
