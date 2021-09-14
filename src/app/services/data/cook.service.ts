import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CookService {

  private url = 'http://localhost:8080/backend-filrouge/'

  constructor(private http: HttpClient) { }

  public getRecipeByRestaurant(restaurantId) {
    const url: string = this.url + 'restaurant/' + 'restaurantsid/' + restaurantId
    return this.http.get(url, { observe: 'response' })
  }

  public getAllIngredient() {
    const url: string = this.url + 'ingredient/ingredients'
    return this.http.get(url, { observe: 'response' })
  }

  public createRecipe(newRecipe: any) {
    const url: string = this.url + 'recipe/create'
    return this.http.post(url, newRecipe, { observe: 'response' })

  }

}
