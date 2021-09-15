import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'http://localhost:8080/backend-filrouge/restaurant/'


  constructor(private http: HttpClient) { }

  getRestaurants() {
    const url = this.url + 'restaurants'
    return this.http.get(url, {observe: 'response'});
  }

  getRestaurantById(id: String) {
    const url = this.url + 'restaurantsid/' + id
    return this.http.get(url, {observe: 'response'});
  }

  postRestaurant(restaurant: any) {
    const url = this.url + 'create'
    return this.http.post(url, restaurant, {observe: 'response'});
  }

  addUserToRestaurant(restaurantId: String, userId: String[]){
    const url = this.url + 'addusers/' + restaurantId
    return this.http.post(url, userId, {observe: 'response'});
  }

  addRecipeToRestaurant(restaurantId, recipe: String[]) {
    const url = this.url + 'addrecipes/' + restaurantId;
    return this.http.post(url, recipe, {observe: 'response'});
  }

  removeRecipeToRestaurant(restaurantId, recipeIds: any){
    const url = this.url + 'removerecipes/' + restaurantId;
    return this.http.delete(url, recipeIds);
  }
}
