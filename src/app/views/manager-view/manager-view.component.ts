import { Component, OnInit, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;

  private restaurantId: any;


  constructor() {
  }

  ngOnInit() {
    this.showSubView = 'homePage';
    this.restaurantId = ["613884cf841a951be1274a98"]
  }




}
