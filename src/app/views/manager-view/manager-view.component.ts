import { Component, OnInit, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;
  @Input() user: any;

  public managerRestaurant: any;


  constructor() {
  }

  ngOnInit() {
    this.showSubView = 'homePage';
    this.managerRestaurant = this.user.restaurants
    console.log(this.managerRestaurant)
    // this.managerRestaurant = ["613884cf841a951be1274a98"]
  }




}
