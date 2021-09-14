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
  //public recipeToSet: Categories.Recipe;
  public recipeToSet: any;

  // constructor(private commandsService: CommandsService) {
  // }

  constructor(private cookService: CookService, private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.refreshRecipes()
  }

  refreshRecipes() {
    console.log("test");
    this.cookService.getRecipeByRestaurant(this.fakeRestaurantId).subscribe(
      data => {
        console.log("data", data)
        this.restaurant = data.body;
        this.restaurantRecipes = this.restaurant.recipes;
        console.log("les recettes", this.restaurantRecipes)
      },
      err => {
        console.log('erreur', err)
      }
    )


  }

  onRecipeButtonClick(recipe){
     this.isCreatingRecipe = !this.isCreatingRecipe;
     this.recipeToSet = recipe;
  }
}
