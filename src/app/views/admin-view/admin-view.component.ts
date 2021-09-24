import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  @Input() loggedUser: any;
  @Input() showSubView: any;
  @Input() availableRoles: any;

  public restaurants: any;
  public selectedRestaurant: any;
  public menuItem = 'restaurantEdition';
  public notManagedRestaurant: any;
  // the following variable could be written in restaurant entity to allow customized limit per restaurant
  public maxRestaurantManagers = 1

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.refreshRestaurants()
  }

  refreshRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.restaurants = Object.assign([], data.body)
        this.notManagedRestaurant = [...this.restaurantHasManager()]
      })
  }

  selectRestaurant(event) {
    this.selectedRestaurant = { ...this.restaurants.find(restaurant => restaurant.id === event) }
  }

  selectMenuItem(event) {
    this.menuItem = event
  }

  // Recover restaurants with number of manager < maxRestaurantManagers
  restaurantHasManager() {
    var filteredRestaurants = []
    this.restaurants.forEach(restaurant => {
      var count = 0
      var restaurantManagers = []

      // Get restaurant managers
      restaurant.employees.forEach(employee => {
        if (employee.roles.find(role => role.name === "Manager")) {
          restaurantManagers.push(employee)
          count ++
        }
      });
      console.log(restaurantManagers)

      // check if restaurant can have more managers
      if (count < this.maxRestaurantManagers) {
        filteredRestaurants.push(restaurant)
      }
    });
    return filteredRestaurants
  }



}
