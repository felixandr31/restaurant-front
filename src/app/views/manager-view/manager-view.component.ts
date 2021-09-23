import { Component, OnInit, Input, Output } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { IngredientService } from 'src/app/services/data/ingredient.service';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;
  @Input() user: any;

  public stocks: any;
  public ingredients : any;
  public managerRestaurant: any;

  constructor(private restaurantService: RestaurantService, private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.showSubView = 'homePage';
   

    
    // this.stocks = Object.assign({}, this.managerRestaurant.stocks)
    this.refreshIngredients()
    this.refreshRestaurant()

 
  }

  refreshRestaurant() {
    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {  
        this.managerRestaurant = {...data.body}
      }
    )
  }

  refreshIngredients() {
    this.ingredientService.getIngredient().subscribe(
      data => {
        this.ingredients = data.body;
        console.log(this.ingredients)
      },
      err => {
        console.log('erreur', err)
      }
    )
  }

}
