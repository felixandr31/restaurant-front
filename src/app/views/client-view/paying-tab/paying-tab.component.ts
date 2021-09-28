import { Component, OnInit, Input, SimpleChange, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-paying-tab',
  templateUrl: './paying-tab.component.html',
  styleUrls: ['./paying-tab.component.css']
})
export class PayingTabComponent implements OnInit, OnDestroy {

  @Input() user: any;
  @Input() booking: any;

  subscription: Subscription = null
  private source = interval(10000)


  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
    if (this.booking.id) {
      this.subscription = this.source.subscribe(
        val => {this.refreshBooking()}
      )
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  payOrder() {
    this.booking.payed = true;
    this.bookingService.updateBookingStatus(this.booking.id, this.booking).subscribe(
      data => {
        console.log(data)
        alert('Dear ' + this.user.firstName + ', thanks for your visit at our place, we hope you had a good time')
      }
    )
  }

  refreshBooking() {
    this.bookingService.getBookingById(this.booking.id).subscribe(
      data => {
        this.booking = data.body;
        console.log(this.booking)
      }
    )
  }
}
