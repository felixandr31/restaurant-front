import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit, OnChanges {


  @Input() loggedUser: any;
  @Input() showSubView: any;
  @Input() availableRoles: any;

  public allRestaurants: any;
  public selectedRestaurant: any;
  public menuItem = 'restaurantEdition';
  public notManagedRestaurant: any;
  // the following variable could be written in restaurant entity to allow customized limit per restaurant
  public maxRestaurantManagers = 1
  public restaurantManagersId = []
  public availableEmployees: any

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.refreshRestaurants()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showSubView === "restaurants") {
      this.refreshRestaurants
    }
  }

  refreshRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.allRestaurants = Object.assign([], data.body)
        this.notManagedRestaurant = [...this.restaurantHasManager()]
      })
  }

  selectRestaurant(event) {
    this.selectedRestaurant = { ...this.allRestaurants.find(restaurant => restaurant.id === event) }
  }

  selectMenuItem(event) {
    this.menuItem = event
  }

  // Recover restaurants with number of manager < maxRestaurantManagers
  restaurantHasManager() {
    var filteredRestaurants = []

    this.allRestaurants.forEach(restaurant => {
      var count = 0
      // check if restaurant has employees
      if (restaurant.employees.length > 0) {
        // Get restaurant managers
        restaurant.employees.forEach(employee => {
          if (employee.roles.find(role => role.name === "Manager")) {
            this.restaurantManagersId.push(employee.id)
            count++
            employee.manager= true
          }
        });
        // check if restaurant can have more managers
        if (count < this.maxRestaurantManagers) {
          filteredRestaurants.push(restaurant)
        }
      }
      // no employee mean restaurant can have manager
      else {
        filteredRestaurants.push(restaurant)
      }
    });
    this.restaurantManagersId = {... this.restaurantManagersId }
    return filteredRestaurants
  }



}
