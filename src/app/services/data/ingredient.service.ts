import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private url = 'http://localhost:8080/backend-filrouge/ingredient/'

  constructor(private http: HttpClient) { }

  createIngredient(ingredient){
    const url = this.url + 'create'
    return this.http.post(url, ingredient, {observe: 'response'});
  }
  getIngredient() {
    const url = this.url + 'ingredients'
    return this.http.get(url, {observe: 'response'});
 }
}
