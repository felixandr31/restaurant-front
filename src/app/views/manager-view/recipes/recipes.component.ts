import { Component, Input, OnInit } from '@angular/core';
import { CookService } from 'src/app/services/data/cook.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {


  @Input() user: any

  public restaurant: any
  restaurantRecipeList: [];
  restaurantRecipes: any;

  constructor(private restaurantService: RestaurantService) { }





  ngOnInit() {
    console.log(this.user)
    this.showRecipe()


  }

  ngOnChanges() {
  }

  showRecipe() {
    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      (data) => {
        this.restaurant = data.body
        console.log("restaurant?", this.restaurant)
        this.restaurantRecipes = this.restaurant.recipes
        console.log("recipes", this.restaurantRecipes)
        


      }
    )
  }










}
