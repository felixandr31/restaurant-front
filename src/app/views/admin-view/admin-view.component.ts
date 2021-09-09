import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  @Input() showSubView: any;
  public restaurants: any;
  public selectedRestaurant: any;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.restaurants = data.body;
        console.log(this.restaurants)
      },
      err => {
        console.log('erreur', err)
      }
    )
  }

  restaurantSelected(event){
    console.log(event)
    this.selectedRestaurant = this.restaurants.find(restaurant => restaurant.id === event)
    console.log(this.selectedRestaurant)
  }

}
