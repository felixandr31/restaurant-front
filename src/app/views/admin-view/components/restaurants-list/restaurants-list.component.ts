import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  @Input() restaurants: any;
  @Output() onRestaurantSelection = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  restaurantSelected(event) {
    console.log(event)
    this.onRestaurantSelection.emit(event.target.value);
  }

}
