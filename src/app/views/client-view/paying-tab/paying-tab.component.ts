import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';

@Component({
  selector: 'app-paying-tab',
  templateUrl: './paying-tab.component.html',
  styleUrls: ['./paying-tab.component.css']
})
export class PayingTabComponent implements OnInit {

  @Input() user: any;
  @Input() booking: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

  payOrder() {
    this.booking.payed = true;
    this.bookingService.updateBookingStatus(this.booking.id, this.booking).subscribe(
      data =>  {
        console.log(data)
        alert('Dear ' + this.user.firstName + ', thanks for your visit at our place, we hope you had a good time')
      }
    )
  }

}
