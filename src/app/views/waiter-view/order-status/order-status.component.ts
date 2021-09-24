import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
@Input() booking: any
@Input() user: any



  constructor(private bookingService: BookingService) { }


  ngOnInit() {
    console.log(this.booking)

  }

  ngOnChanges(){
  
    

  }

  orderPlaced() {
    this.booking.served = true;
    this.bookingService.updateBookingStatus(this.booking.id, this.booking).subscribe(
      data =>  {
        console.log(data)
        alert(this.user.firstName + ', thanks for your order')
      }
    )
  }

}


