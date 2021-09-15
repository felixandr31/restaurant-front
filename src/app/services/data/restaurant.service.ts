import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'http://localhost:8080/backend-filrouge/restaurant/'
  private urlStock = 'http://localhost:8080/backend-filrouge/stock/'

  constructor(private http: HttpClient) { }

  getRestaurants() {
    const url = this.url + 'restaurants'
    return this.http.get(url, {observe: 'response'});
  }

  getRestaurantById(id) {
    const url = this.url + 'restaurantsid/' + id
    return this.http.get(url, {observe: 'response'});
  }

  postRestaurant(restaurant: any) {
    const url = this.url + 'create'
    return this.http.post(url, restaurant, {observe: 'response'});
  }

  addUserToRestaurant(restaurantId, userId: String[]){
    const url = this.url + 'addusers' + restaurantId
    return this.http.post(url, userId, {observe: 'response'});
  }

  addStockToRestaurant(restaurantId, stockId: Set<String>){
    const url = this.url + 'addstocks' + restaurantId
    return this.http.post(url, stockId, {observe: 'response'});
  }

  getStocks() {
    const urlStock = this.urlStock + 'stocks'
    return this.http.get(urlStock, {observe: 'response'});
  }
}
