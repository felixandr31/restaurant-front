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

  makeRestaurantMarker(map: L.map, restaurants): void {
    restaurants.forEach(restaurant => {
      const lon = restaurant.coordinates.longitude;
      const lat = restaurant.coordinates.latitude;
      const marker = L.marker([lat, lon]);

      marker.bindPopup(this.popupService.makeRestaurantPopup(restaurant))

      marker.addTo(map).on('click', e => {this.emitRestaurant(restaurant)});
    })
  }

  emitRestaurant(arg) {
    this.restaurantEmission.next(arg)
  }

}
