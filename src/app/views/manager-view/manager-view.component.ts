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
    console.log('user: ', this.user)

    // TODO: quand back push => récupérer restaurant avec user. remplacer par :
    const managerRestaurantId = ["613885d5841a951be1274a9a"]
    // const managerRestaurantId = this.user.restaurantId

    this.restaurantService.getRestaurantById(managerRestaurantId.toString()).subscribe(
      data =>{
        this.managerRestaurant = data.body
        console.log('managerRestaurant', this.managerRestaurant)
      },
      err => {
        console.log('Error: ', err)
      }
    )

  }




}
