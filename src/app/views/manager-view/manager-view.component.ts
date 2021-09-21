import { Component, OnInit, Input, Output } from '@angular/core';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { IngredientService } from 'src/app/services/data/ingredient.service';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;
  @Input() user: any;
  @Input() availableRoles: any;

  public stocks: any;
  public ingredients : any;

  constructor(private restaurantService: RestaurantService, private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.showSubView = 'homePage';
    this.ingredientService.getIngredient().subscribe(

      data => {
        this.ingredients = data.body;
        console.log(this.ingredients)
      },
      err => {
        console.log('erreur', err)
      }
    )
  }

}
