import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/data/booking.service';
import { CookService } from 'src/app/services/data/cook.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { TableService } from 'src/app/services/data/table.service';
import { error } from 'util';

@Component({
  selector: 'app-waiter-view',
  templateUrl: './waiter-view.component.html',
  styleUrls: ['./waiter-view.component.css']
})
export class WaiterViewComponent implements OnInit {
  fakeRestaurantId: string = "613885d5841a951be1274a9a";

  public restaurant: any;
  public restaurantTables: any;
  @Input() restaurantId: String;
  @Input() user:any;
 
 
  public isCreatingRecipe: boolean = true;

 

  constructor(private bookingService: BookingService, private tableService: TableService, private restaurantService: RestaurantService, private cookSevice: CookService) { }

  ngOnInit() {
    this.showTables()
    
  }

  

  showTables() {
    
    this.restaurantService.getRestaurantById(this.fakeRestaurantId).subscribe(
      data => {
        console.log(data.body)
        this.restaurant= data.body;
        this.restaurantTables=this.restaurant.tables
        console.log("les tables", this.restaurantTables)

      },
      err => {
        console.log(error, err)
        
      }

    )
  }

 
}