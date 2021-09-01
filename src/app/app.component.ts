import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant-front';

  constructor() {
  }

  public client = {
    name: 'Georges',
    roles: [
      {name: 'Admin'},
      {name: 'Manager'},
      {name: 'Cook'},
      {name: 'Waiter'},
      {name: 'Client'},
    ]
  }

  public clientRoles = this.client.roles
  public showView = "Client";
  public showSubView = 'friends';

  selectedView(event){
    console.log('selected view :', event)
    this.showView = event;
  }

  updateSubView(event) {
    this.showSubView = event;
    console.log('subview depuis App', event)
  }
}
