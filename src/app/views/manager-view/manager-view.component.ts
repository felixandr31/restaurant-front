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

    // TODO: quand back push => récupérer restaurant avec user. remplacer par :
    //const managerRestaurantId = ["613885d5841a951be1274a9a"]
    const managerRestaurantId = ["6131c91756aac85ca96e1197"]
    //
    // const managerRestaurantId = this.user.restaurantId

    this.restaurantService.getRestaurantById(managerRestaurantId.toString()).subscribe(
      data =>{
        this.managerRestaurant = data.body
      },
      err => {
        console.log('Error: ', err)
      }
    )

    this.restaurantService.getStocks().subscribe(
      data => {
        this.stocks = data.body;
        console.log(this.stocks)
      },
      err => {
        console.log('erreur', err)
      }
    )


  }




}
