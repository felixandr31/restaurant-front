import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.css']
})
export class RestaurantMapComponent implements OnInit {

  @Input() restaurants: any;
  constructor() { }

  ngOnInit() {
  }

}
