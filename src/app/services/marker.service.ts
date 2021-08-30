import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private restaurantEmission = new Subject<any>();
  public restaurantEmitted$ = this.restaurantEmission.asObservable();

  constructor(
    private http: HttpClient,
    private popupService: PopupService
    ) { }

  private restaurants = [
    {
      name: "Zozan",
      stars: 5,
      coordinates: {
        latitude: 43.58516,
        longitude: 1.40005
      }
    },
    {
      name: "BFC",
      stars: 4,
      coordinates: {
        latitude: 43.58395,
        longitude: 1.40126
      }
    }
  ];

  makeRestaurantMarker(map: L.map): void {
    this.restaurants.forEach(restaurant => {
      const lon = restaurant.coordinates.longitude;
      const lat = restaurant.coordinates.latitude;
      const marker = L.marker([lat, lon]);

      marker.bindPopup(this.popupService.makeRestaurantPopup(restaurant))

      marker.addTo(map).on('click', e => {this.emitRestaurant(restaurant)});
    })
  }

  emitRestaurant(arg) {
    console.log('tu as souscrit, me voila', arg)
    this.restaurantEmission.next(arg)
  }

}
