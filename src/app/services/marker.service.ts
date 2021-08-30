import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) { }

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

      marker.addTo(map);
    })
  }

}
