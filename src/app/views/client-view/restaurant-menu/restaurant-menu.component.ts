import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  @Input() restaurant: any;

  constructor() { }

  ngOnInit() {
  }

}
