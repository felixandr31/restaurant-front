import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit  {


  @Input() loggedUser: any;
  @Input() showSubView: any;
  @Input() availableRoles: any;

  public allRestaurants: any;
  public selectedRestaurant: any;
  public menuItem = 'restaurantEdition';
  public notManagedRestaurant: any;
  // the following variable could be written in restaurant entity to allow customized limit per restaurant
  public maxRestaurantManagers = 1;
  public restaurantManagersId = [];
  public availableEmployees: any;

  constructor(private restaurantService: RestaurantService, private userService: UserService) { }

  ngOnInit() {
    this.refreshRestaurants()
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //     this.refreshRestaurants()
  // }

  refreshRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.allRestaurants = Object.assign([], data.body)
        this.notManagedRestaurant = [...this.restaurantHasManager(Object.assign([], data.body))]
        console.log(this.notManagedRestaurant)
      })

  }

  selectRestaurant(event) {
    this.selectedRestaurant = { ...this.allRestaurants.find(restaurant => restaurant.id === event) }
  }

  selectMenuItem(event) {
    this.menuItem = event
  }

  // Recover restaurants with number of manager < maxRestaurantManagers
  restaurantHasManager(restaurants) {
    var filteredRestaurants = [];
    let managersId = [];

    restaurants.forEach(restaurant => {
      var count = 0
      // check if restaurant has employees
      if (restaurant.employees.length > 0) {
        // Get restaurant managers
        restaurant.employees.forEach(employee => {
          if (employee.roles.find(role => role.name === "Manager")) {
            managersId.push(employee.id)
            count++
            employee.manager = true
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
    this.restaurantManagersId = { ... managersId }
    return filteredRestaurants
  }

  resetUserRolesToClient(event) {
    let user = this.selectedRestaurant.employees.find(employee => employee.id === event.target.value)
    let rolesIdsToRemove: string[];
    let clientRole: any = this.availableRoles.find(role => role.name === 'Client')

    // Build array of roleIds for delete request
    rolesIdsToRemove = this.availableRoles.map(role => {
      return role.id;
    })

    this.userService.removeRoles(user.id, rolesIdsToRemove).subscribe(
      data => {
        this.userService.addRoles(user.id, [clientRole.id]).subscribe(
          data => {
            let client: any = data.body
            // Remove user from restaurant
            const options = {
              body:
                [client.id]
              ,
            };
            this.restaurantService.removeUsersFromRestaurant(client.restaurantId, options).subscribe(
              data => {
                this.refreshRestaurants()
                // Maj user.restaurantId
                client.restaurantId = ""
                this.userService.updateUser(client.id, client).subscribe(
                  data => {
                    // refresh employee list of selected restaurant
                    this.selectedRestaurant = {... this.allRestaurants.find(restaurant => restaurant.id === this.selectedRestaurant.id)}
                  }
                )
              }
            )
          }
        )
      }
    )
  }


}
