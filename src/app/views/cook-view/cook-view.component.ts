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
  public recipesList: any = [];
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
    this.cookService.getRecipeByRestaurant(this.fakeRestaurantId).subscribe(
      data => {
        this.restaurant = data.body;
        console.log("restaurant", this.restaurant)
        this.restaurantRecipes = this.restaurant.recipes ;
        console.log("recipe", this.restaurantRecipes)
      },
      err => {
        console.log('erreur', err)
      }
    )
    this.refreshRecipes()
  }

  refreshRecipes() {
    // this.commandsService.getAllRecipes().then( res => {
    //   this.recipesList = res
    // })
  }

  onRecipeButtonClick(recipe){
     this.isCreatingRecipe = !this.isCreatingRecipe;
     this.recipeToSet = recipe;
  }
}
