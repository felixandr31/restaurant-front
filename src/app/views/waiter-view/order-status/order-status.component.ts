import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
@Input() booking: any


  constructor(private bookingService: BookingService) { }


  ngOnInit() {
    
    
  }

  ngOnChanges(changes: SimpleChanges){
    if(!this.booking.ordered ){
      setTimeout(()=>{
        this.booking.ordered=true
      }

      )
    }

  }

  orderPlaced(){
    this.booking.ordered = true
    
  }

}


