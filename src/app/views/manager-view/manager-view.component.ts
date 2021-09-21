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
    //const managerRestaurantId = ["6131c91756aac85ca96e1197"]

    // console.log('managerRestaurant: ', this.managerRestaurant)
    // this.stocks = Object.assign({}, this.managerRestaurant.stocks)
    
    this.refreshRestaurant()
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

  refreshRestaurant() {
    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {  
        this.managerRestaurant = data.body
      }
    )
  }

}
