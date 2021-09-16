import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/map/marker.service';
import { Subscription } from 'rxjs';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.css']
})
export class RestaurantMapComponent implements OnChanges, AfterViewInit {

  private restaurantEmissionRef: Subscription = null;

  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [43.58512, 1.39985],
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
  @Output() onRestaurantSelection = new EventEmitter();

  constructor(private markerService: MarkerService) { }

  ngOnChanges() {
    if (!this.map) {
      this.initMap();
    }
    if (this.map) {
      this.markerService.makeRestaurantMarker(this.map, this.restaurants);
    }
  }

  ngAfterViewInit() {
    this.restaurantEmissionRef = this.markerService.restaurantEmitted$.subscribe(event => {
      this.onRestaurantSelection.emit(event);
    })
  }

  ngOnDestroy() {
    if (this.restaurantEmissionRef) { this.restaurantEmissionRef.unsubscribe() };
  }
}
