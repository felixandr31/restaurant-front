import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';



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
export class WaiterViewComponent implements OnInit, OnChanges {


  public restaurant: any;
  public restaurantTables: any = []
  public tablesBooking: any;
  private bookingsAtTime = []
  public restaurantId: String;
  public currentDate: Date;
  @Input() user: any;

  private today = new Date()





  // public reservationDate = {
  //   day: this.today.toISOString().replace( /^(?<year>\d+)-(?<month>\d+)-(?<day>\d+)T.*$/,'$<year>-$<month>-$<day>')

  // }

  public reservationDate = {
    day: ""
  }

  public todaysBookings: any = []

  //public isCreatingRecipe: boolean = true;
  public isCreatingTable = true

  constructor(private bookingService: BookingService, private tableService: TableService, private restaurantService: RestaurantService, private cookSevice: CookService) { }


  ngOnInit() {
     
  }

  ngOnChanges() {
    console.log('onchanges user', this.user)
    this.showTables()
    this.restaurantId = this.user.restaurantId
    console.log('resto ID', this.restaurantId)
    console.log('bookings and tables ?', this.todaysBookings.length && this.restaurantTables.length)
    if (!this.todaysBookings.length && this.restaurantTables.length) {
      this.onDateSelected(this.reservationDate.day)
      console.log('tables booking', this.todaysBookings)
    }
  }

  onDateSelected(event) {
    this.todaysBookings = []
    this.reservationDate = event
    this.restaurantTables.forEach(table => {
      this.bookingService.getBookingByTable(table.id).subscribe(
        (data: any) => {
          this.tablesBooking = data.body
          console.log("tableBookings", this.tablesBooking)
          this.tablesBooking.forEach(booking => {
            console.log("booking", booking)
            if (booking.day.substring(0, 10) == this.reservationDate.day) {
              this.todaysBookings.push(booking)
            }

          });
        }
      )
    });
  }

   showTables() {
    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {
        console.log(data.body)
        this.restaurant = data.body;
        this.restaurantTables = this.restaurant.tables
        console.log("les tables", this.restaurantTables)
      },
      err => {
        console.log(error, err)
      }
    )
  }

  







}




