import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  @Input() showSubView: any;
  @Input() availableRoles: any;

  public restaurants: any;
  public selectedRestaurant: any;
  public menuItem = 'restaurantEdition';

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.refreshRestaurants()
  }

  refreshRestaurants(){
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.restaurants = Object.assign([], data.body)
  })
}

  selectRestaurant(event){
    this.selectedRestaurant = {...this.restaurants.find(restaurant => restaurant.id === event)}
  }

  selectMenuItem(event){
    this.menuItem = event
  }
}
