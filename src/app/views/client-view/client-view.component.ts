import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { RoleService } from 'src/app/services/data/role.service';
import { UserService } from 'src/app/services/data/user.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { BookingService } from 'src/app/services/data/booking.service';


@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit, OnChanges {

  @Input() showSubView: any;
  @Input() user: any;
  @Output() onUserRefresh = new EventEmitter();

  public restaurants: any = []

  public restaurant: any =
    {
      name: "", stars: 0,
      coordinates: {},
      recipes: []
    };

  public displayReservationForm = false;

  public currentBooking: any = {};
  public restaurantReservation = {};

  public itemToAdd = '';
  public itemToRemove = '';
  public bill = [];

  constructor(
    private restaurantService: RestaurantService,
    private bookingService: BookingService
    ) { }


  ngOnInit() {

    this.restaurantService.getRestaurants().subscribe(
      data => {
        this.restaurants = data.body;
      },
      err => {
        console.log('erreur', err)
      }
    )
  }

  ngOnChanges() {
  }

  restaurantSelected(event) {
    if (event.name) {
      this.restaurant = event;
    } else {
      this.restaurant = this.restaurants.find(restaurant => restaurant.name === event)
    }
  }

  reservationSelected(event) {
    this.bookingService.getBookingById(event).subscribe(
      data => {
        this.currentBooking = data.body
        this.restaurantService.getRestaurantByTableId(this.currentBooking.table.id).subscribe(
          data => {
            this.restaurantReservation = data.body
          }
        )
      }
    )
  }

  toggleReservationForm() {
    return this.displayReservationForm = !this.displayReservationForm;
  }

  itemAdded(event) {
    this.addToBill(event);
    this.bill = this.bill.slice(0) // {...this.bill} JSON.parse(JSON.stingify(this.bill)) (ou voir avec lodash : cloneDeep())
    console.log('la facture après slice', this.bill)
  }

  itemRemoved(event) {
    this.removeFromBill(event);
    this.bill = this.bill.slice(0)
    console.log('la facture après slice', this.bill)
  }

  addToBill(item) {
    if (this.bill.length < 1) {
      this.bill.push({ name: item, quantity: 1 })
    } else {
      this.bill.find(line => line.name === item) ?
        this.bill.filter(line => line.name === item).map(line => line.quantity += 1) :
        this.bill.push({ name: item, quantity: 1 });
    }
  }

  removeFromBill(item) {
    if (this.bill.length < 1
      || !this.bill.find(it => it.name === item)
      || this.bill.find(it => it.name === item && it.quantity < 1)) {
      return;
    } else {
      this.bill.filter(line => line.name === item).map(line => line.quantity -= 1)
    }
  }

  refreshUser(event) {
    this.onUserRefresh.emit(event);
  }
}
