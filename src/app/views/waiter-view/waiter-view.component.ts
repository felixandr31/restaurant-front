import { Component, Input, OnChanges, OnInit } from '@angular/core';



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
  fakeRestaurantId: string = "613885d5841a951be1274a9a";

  public restaurant: any;
  public restaurantTables: any;
  public tablesBooking: any;
  private bookingsAtTime = []
  @Input() restaurantId: String;
  @Input() user: any;



  public reservationDate = {
    day: ''
    
  }

  public day = '2021-09-13'
  public todaysBookings: any = []
  public currentDate: any


  //public isCreatingRecipe: boolean = true;
  public isCreatingTable = true


  constructor(private bookingService: BookingService, private tableService: TableService, private restaurantService: RestaurantService, private cookSevice: CookService) { }

  ngOnInit(){
  }

  ngOnChanges() {
    console.log('onchanges user', this.user)
    this.showTables()

  }

  onDateSelected(event){
    this.todaysBookings = []
    this.reservationDate = event
    this.restaurantTables.forEach(table => {
      this.bookingService.getBookingByTable(table.id).subscribe(
        (data: any)=>{
          this.tablesBooking = data.body
          console.log(this.tablesBooking)
          this.tablesBooking.forEach(booking => {
            console.log("booking", booking)
            if (booking.day.substring(0,10) == this.reservationDate.day) {

              this.todaysBookings.push(booking)              
            } 
          });
        }
      )  
    });
    // forkJoin(queries).subscribe(
    //   (data: any)=>{this.tablesBooking = data.map(book => book.body)
    //     this.tablesBooking.forEach(bookings => {
    //       bookings.forEach(booking => {
    //         if (booking.day.substring(0,10) == this.reservationDate.day) {
    //           this.todaysBookings.push(booking)
              
    //         }
            
    //       });
          
    //     });

    //   }
    // )
  }

  



  showTables() {

    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {
        console.log(data.body)
        this.restaurant = data.body;
        this.restaurantTables = this.restaurant.tables
        console.log("les tables", this.restaurantTables)
        // const queries = this.restaurantTables.map(table => this.bookingService.getBookingByTable(table.id))
        // // const queries = Object.keys(this.restaurantTables).map(tabKey => {
        // //   console.log("number?", this.restaurantTables[tabKey].id)
        // //   return this.bookingService.getBookingByTable(this.restaurantTables[tabKey].id) ;
        // // })
        // console.log("queries", queries)
        // forkJoin(queries).subscribe(
        //   (data: any) => {
        //     this.tablesBooking = data.map(book => book.body)
        //     console.log("forj", this.tablesBooking)
        //     this.tablesBooking.forEach(bookings => {
        //       console.log("books", bookings)
              
        //       bookings.forEach(booking => {
        //         if (booking.day.substring(0,10) == this.day) {
        //           this.todaysBookings.push(booking)
                  
        //         }
        //       })


              // bookings.filter(book=> {
              //   console.log('book day', book.day.substring(0,10) == this.day)
              //   book.day.substring(0, 10) === this.day})              
              // // bookings.forEach(booking => {
              // //   booking.day = new Date(booking.day)

              // // });
            
              
              
              // bookings.forEach(booking => {
              //   console.log("booking", booking)
              
              // });
              
              
              // this.todaysBookings.push(booking.filter(booking => {
              //   booking.day.substring(0, 10) == this.day
              // }))
              // console.log('booking for the day', this.todaysBookings)
              // this.reservationDate = object.filter()
          //     // console.log("object",object.day.substring(0,10))
          //   });
          //   console.log('todays bookings', this.todaysBookings)
          // });
      },
      err => {
        console.log(error, err)
      }
    )
  }

  // showTables2() {
  //   this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
  //     data => {
  //       console.log(data.body)
  //       this.restaurant = data.body;
  //       this.restaurantTables = this.restaurant.tables
  //       console.log("les tables", this.restaurantTables)
  //       //const queries = this.restaurantTables.map(table => this.bookingService.getBookingByTable(table.id))
  //       this.restaurantTables.forEach(table => {this.bookingService.getBookingByTable(table.id).subscribe(
  //         data=>{
  //           this.tablesBooking = data.body
  //           console.log('booking table unique', this.tablesBooking)
  //           if (this.tablesBooking.filter(booking=> booking.day.substring(0, 10) == this.day).length) {
  //             this.todaysBookings.push(this.tablesBooking.filter(booking=> booking.day.substring(0, 10) == this.day) ) 
  //             console.log("todaysBookings", this.todaysBookings)
  //           }  
  //         }
  //       )
  //       });
  //     },
  //     err => {
  //       console.log(error, err)
  //     }
  //   )
  // }
}


