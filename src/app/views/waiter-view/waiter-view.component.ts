import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
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
  public tablesBooking: any;
  private bookingsAtTime = []
  @Input() restaurantId: String;
  @Input() user:any;
  public localTime = moment().format('YYYY-MM-DD'); // store localTime
  public  proposedDate = this.localTime + "T00:00:00.000Z";
  

  public reservationDate = {
    day: '',
    hour: '',
    
  }
 
 
  //public isCreatingRecipe: boolean = true;
public isCreatingTable = true
 

  constructor(private bookingService: BookingService, private tableService: TableService, private restaurantService: RestaurantService, private cookSevice: CookService) { }

  ngOnInit() {
    this.showTables()
    // this.showBooking()
    
  }

  

  showTables() {
    
    this.restaurantService.getRestaurantById(this.fakeRestaurantId).subscribe(
      data => {
        console.log(data.body)
        this.restaurant= data.body;
        this.restaurantTables=this.restaurant.tables
        console.log("les tables", this.restaurantTables)
        const queries = this.restaurantTables.map(table => this.bookingService.getBookingByTable(table.id))
        // const queries = Object.keys(this.restaurantTables).map(tabKey => {
        //   console.log("number?", this.restaurantTables[tabKey].id)
        //   return this.bookingService.getBookingByTable(this.restaurantTables[tabKey].id) ;
        // })
        console.log("queries", queries)
        forkJoin(queries).subscribe(
          (data:any) => {
            this.tablesBooking= data.map(book => book.body)
            console.log("forj", this.tablesBooking)
             //this.bookingsAtTime = this.tablesBooking.filter(booking => booking.day.substring(0, 10) == this.reservationDate.day && booking.hour == this.reservationDate.hour + ':00')
          }
        )
      },
      err => {
        console.log(error, err)
        
      }

    )

    const  isValidDate = moment(this.proposedDate).isValid();
    console.log(isValidDate)
  }

  


  

 
}