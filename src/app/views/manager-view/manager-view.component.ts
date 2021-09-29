import { Component, OnInit, Input, Output } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { IngredientService } from 'src/app/services/data/ingredient.service';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() loggedUser: any;
  @Input() showSubView: any;
  @Input() user: any;
  @Input() availableRoles: any;

  public currentView = 'Manager'
  public stocks: any;
  public ingredients : any;
  public managerRestaurants: any;
  public selectedRestaurant: any;

  constructor(private restaurantService: RestaurantService, private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.showSubView = 'homePage';
    // this.stocks = Object.assign({}, this.managerRestaurant.stocks)
    this.refreshIngredients()
    this.refreshRestaurant()
  }

  refreshRestaurant() {
    // TOdo if loggerUser.role != admin : filter by loggedUser.restaurantId
  // TODO for all resto of user.restaurantId
  // query = loggedUser.restaurantId
  // forkjoin (query)

    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {
        this.managerRestaurants = Object.assign([], data.body)

      }
    )
  }

  selectRestaurant(event) {
    this.selectedRestaurant = this.managerRestaurants.find(restaurant => restaurant.id === event)
  }

  refreshIngredients() {
    this.ingredientService.getIngredient().subscribe(
      data => {
        this.ingredients = data.body;
      },
      err => {
        console.log('error', err)
      }
    )
  }

}
