import { Component, OnInit, Input, SimpleChange, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';
import { interval, Subscription } from 'rxjs';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-paying-tab',
  templateUrl: './paying-tab.component.html',
  styleUrls: ['./paying-tab.component.css']
})
export class PayingTabComponent implements OnInit, OnDestroy {

  @Input() user: any;
  @Input() booking: any;
  @Input() restaurant: any;

  subscription: Subscription = null
  private source = interval(10000)


  constructor(private bookingService: BookingService,
    private restaurantService: RestaurantService) {
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
    console.log('restaurant', this.restaurant)
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
  }

  payOrder() {
    this.booking.payed = true;
    this.bookingService.updateBookingStatus(this.booking.id, this.booking).subscribe(
      data => {
        console.log('payed booking', data)
        console.log('budget before', this.restaurant.budget)
        this.restaurant.budget += this.computeTotal(this.booking)
        console.log('budget after', this.restaurant.budget)
        this.restaurantService.updateRestaurant(this.restaurant.id, this.restaurant).subscribe(
          data => {
            console.log('restaurant budget updated', data)
          }
        )
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

  computeTotal(booking: any) {
    const total = booking.orders.reduce((acc, val) => {
      acc += val.quantity * val.item.sellingPrice
      return acc
    },0)
    return total
  }
}
