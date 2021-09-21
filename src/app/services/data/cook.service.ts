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

  public getIngredientById(ingredientId: string){
    const url: string = this.url + 'ingredient/ingredients/' + ingredientId
    return this.http.get(url, { observe: 'response' })
  }

  public createRecipe(newRecipe: any) {
    const url: string = this.url + 'recipe/create'
    return this.http.post(url, newRecipe, { observe: 'response' })
  }

  public createIngredientRecipe(newIngredientRecipe: any) {
    const url: string = this.url + 'ingredientrecipe/create'
    return this.http.post(url, newIngredientRecipe, { observe: 'response' })
  }

  public addIngredientRecipeToRecipe(recipeId: string, newIngredientRecipe: any){
    const url: string = this.url + 'recipe/addingredientrecipes/' + recipeId 
    console.log("url", url)
    return this.http.post(url, newIngredientRecipe, { observe: 'response' })
  }

  public updateRecipe(recipeId: string, newRecipe: any){
    const url: string = this.url + 'update/' + recipeId 
    return this.http.put(url, newRecipe, { observe: 'response' })
  }

  public createIngredient(ingredient: any) {
    const url: string = this.url + 'ingredient/create'
    return this.http.put(url, ingredient, { observe: 'response' })
  }
}
