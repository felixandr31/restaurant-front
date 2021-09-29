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


  constructor(private restaurantService: RestaurantService, private userService: UserService) { }

  ngOnInit() {
    this.refreshRestaurants()
  }

  refreshRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.allRestaurants = Object.assign([], data.body)
      })
  }

  triggerRestaurantCreation(){
    this.isRestaurantSelected = false
    this.selectedRestaurant = {}
    this.creationMode = !this.creationMode
    // switch to Edit with empty restaurant?
  }

  selectRestaurant(event) {
    this.isRestaurantSelected = true
    this.selectedRestaurant = this.allRestaurants.find(restaurant => restaurant.id === event)
  }

  selectMenuItem(event) {
    this.menuItem = event
  }




}
