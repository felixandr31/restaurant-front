import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  @Input() restaurants: any;
  @Output() onRestaurantSelection = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  restaurantSelected(event) {
    this.onRestaurantSelection.emit(event);
  }

}
