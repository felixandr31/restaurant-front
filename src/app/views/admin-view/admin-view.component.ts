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

  public currentView = 'Admin'
  public allRestaurants: any;
  public selectedRestaurant: any= {};
  public isRestaurantSelected = false;
  public menuItem = 'restaurantEdition';
  public creationMode = false;
  public triggerCreate = 'triggerCreate'
  public availableUsers: any[];


  constructor(private restaurantService: RestaurantService, private userService: UserService) { }

  ngOnInit() {
    this.refreshRestaurants()
    this.refreshAllUsers()
  }

  refreshRestaurants() {
    let restaurantId = this.selectedRestaurant.id
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.allRestaurants = Object.assign([], data.body)
        this.selectedRestaurant = this.allRestaurants.find(restaurant => restaurant.id === restaurantId)
      })
  }

  refreshAllUsers() {
    this.userService.getUsers().subscribe(
      data => {
        // Remove logged User from Users list to avoid self modifications
        this.availableUsers = Object.assign([], data.body).filter((user) => user.id !== this.loggedUser.id)
      }
    )
  }

  toggleRestaurantCreation(){
    this.isRestaurantSelected = false
    this.selectedRestaurant = {}
    this.creationMode = true
  }

  selectRestaurant(event) {
    this.creationMode = false
    this.isRestaurantSelected = true
    this.selectedRestaurant = this.allRestaurants.find(restaurant => restaurant.id === event)
  }

  selectMenuItem(event) {
    this.menuItem = event
  }

  cancelRestaurantCreation() {
    this.isRestaurantSelected = false
    this.creationMode = false
  }


}
