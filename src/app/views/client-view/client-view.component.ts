import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
  public restaurantReservation: any = {};

  public itemToAdd = '';
  public itemToRemove = '';
  public bill = [];

  private currentMenu = [];
  public cachedStocks;

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
        console.log('resa', this.currentBooking)
        this.restaurantService.getRestaurantByTableId(this.currentBooking.table.id).subscribe(
          data => {
            this.restaurantReservation = data.body
            this.cachedStocks = this.restaurantReservation.stocks
            this.currentMenu = this.restaurantReservation.recipes;
            this.bill = []
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
    this.removeFromStock(event);
    console.log('stock status', this.cachedStocks)
    this.bill = this.bill.slice(0) // {...this.bill} Object.assign({}, this.bill) JSON.parse(JSON.stingify(this.bill)) (ou voir avec lodash : cloneDeep())
  }

  itemRemoved(event) {
    this.removeFromBill(event);
    this.addToStock(event);
    console.log('stock status', this.cachedStocks)
    this.bill = this.bill.slice(0)
  }

  addToBill(item) {
    const recipe = this.currentMenu.find(line => line.name === item)
    this.bill.find(line => line.item.name === item) ?
      this.bill.filter(line => line.item.name === item).map(line => {
        line.quantity += 1
      }) :
      this.bill.push({ item: {...recipe}, quantity: 1 })
    console.log('la facture', this.bill);
  }

  removeFromStock(recipeName) {
    const currentRecipe = this.restaurantReservation.recipes.find(recipe => recipe.name === recipeName)
    currentRecipe.ingredientsRecipe.forEach(ingR => {
      this.cachedStocks.forEach(stock => {
        if (stock.ingredient.id === ingR.ingredient.id) {
          stock.quantity -= ingR.quantity
        }
      })
    })
    this.cachedStocks = this.cachedStocks.slice(0)
  }

  removeFromBill(item) {
    if (this.bill.length < 1
      || !this.bill.find(it => it.item.name === item)
      || this.bill.find(it => it.item.name === item && it.quantity < 1)) {
      return;
    } else {
      this.bill.filter(line => line.item.name === item).map(line => line.quantity -= 1)
    }
  }

  addToStock(recipeName) {
    const currentRecipe = this.restaurantReservation.recipes.find(recipe => recipe.name === recipeName)
    currentRecipe.ingredientsRecipe.forEach(ingR => {
      this.cachedStocks.forEach(stock => {
        if (stock.ingredient.id === ingR.ingredient.id) {
          stock.quantity += ingR.quantity
        }
      })
    })
    this.cachedStocks = this.cachedStocks.slice(0)
  }

  refreshUser(event) {
    this.onUserRefresh.emit(event);
  }

  refreshBooking(event) {
    console.log(event)
    this.currentBooking = event;
    this.bill = [];
  }
}
