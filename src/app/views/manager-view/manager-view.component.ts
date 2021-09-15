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
  public stocks: any;

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.showSubView = 'homePage';
    const managerRestaurantId = ["6131c91756aac85ca96e1197"]

    

    this.restaurantService.getStocks().subscribe(
      data => {
        this.stocks = data.body;
        console.log(this.stocks)
      },
      err => {
        console.log('erreur', err)
      }
    )


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
