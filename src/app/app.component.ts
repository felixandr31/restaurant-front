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
  public showView = "Client";
  public showSubView = 'eat';

  selectedView(event){
    this.showView = event;
  }

  updateSubView(event) {
    this.showSubView = event;
  }
}
