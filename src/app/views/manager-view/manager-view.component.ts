import { Component, OnInit, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;
  @Input() user: any;

  public managerRestaurant: any;

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.showSubView = 'homePage';
    this.reloadRestaurant();
  }

  reloadRestaurant() {
    return this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {
        this.managerRestaurant = Object.assign({}, data.body)
        console.log('reload restaurant')
      })
  }


}
