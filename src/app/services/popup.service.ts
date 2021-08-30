import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeRestaurantPopup(restaurant: any): string {
    return `` +
    `<div>Restaurant: ${ restaurant.name }</div>` +
    `<div>Stars: ${ restaurant.stars }</div>`
  }
}
