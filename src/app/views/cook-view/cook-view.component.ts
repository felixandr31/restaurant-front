import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CookService } from 'src/app/services/data/cook.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-cook-view',
  templateUrl: './cook-view.component.html',
  styleUrls: ['./cook-view.component.css']
})
export class CookViewComponent implements OnInit {

  @Input() user: any;

  public restaurantId: any;
  public restaurant: any;
  public restaurantRecipes: any;
  public isCreatingRecipe: boolean = true;
  public recipeToSet: any;
  public isChargingRecipe: boolean = false;

  constructor(private cookService: CookService, private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    if (this.restaurantId) {
      this.refreshRecipes();
    }
  }

  ngOnChanges() {
    this.restaurantId = this.user.restaurantId;
    this.refreshRecipes();
  }

  refreshRecipes() {
    this.isChargingRecipe = true;
    this.cookService.getRecipeByRestaurant(this.restaurantId).subscribe(
      data => {
        this.restaurant = data.body;
        this.restaurantRecipes = this.restaurant.recipes;
        this.isChargingRecipe = false;
      },
      err => {
        console.log('erreur', err)
      }
    )
  }

  onRecipeButtonClick(recipe){
    this.isCreatingRecipe = false
    this.recipeToSet = recipe;
  }

  toggleRecipe(){
    this.isCreatingRecipe = !this.isCreatingRecipe
    this.refreshRecipes();
  }
}
