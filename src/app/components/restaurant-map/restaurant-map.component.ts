import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.css']
})
export class RestaurantMapComponent implements AfterViewInit {

  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [43.58495, 1.40350],
      zoom: 14
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map)
  }


  @Input() restaurants: any;
  constructor() { }

  ngAfterViewInit() {
    this.initMap();
  }

}
