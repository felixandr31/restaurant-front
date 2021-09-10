import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {

  @Input() restaurant: any;
  @Output() onRestaurantSelection = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  restaurantSelected(event) {
    this.onRestaurantSelection.emit(event.target.value);
    console.log(this.restaurant)
  }
}
