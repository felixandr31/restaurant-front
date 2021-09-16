import { Component, OnInit, Input } from '@angular/core';
import { CookService } from 'src/app/services/data/cook.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-cook-view',
  templateUrl: './cook-view.component.html',
  styleUrls: ['./cook-view.component.css']
})
export class CookViewComponent implements OnInit {

  @Input() restaurantId: string;

  private fakeRestaurantId: string = "613885d5841a951be1274a9a";
  public restaurant: any;
  public restaurantRecipes: any;
  public isCreatingRecipe: boolean = true;
  public recipeToSet: any;

  constructor(private cookService: CookService, private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.refreshRecipes()
  }

  refreshRecipes() {
    this.cookService.getRecipeByRestaurant(this.fakeRestaurantId).subscribe(
      data => {
        this.restaurant = data.body;
        this.restaurantRecipes = this.restaurant.recipes;
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
