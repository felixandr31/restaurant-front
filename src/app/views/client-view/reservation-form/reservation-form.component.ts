import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BookingService } from 'src/app/services/data/booking.service';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit, OnChanges {

  @Input() restaurant: any;
  @Input() user: any;

  public clients: any = []

  public tables: any = [];

  public maxPlaces: number = 0;
  private tablesAtTime = []
  private bookingsAtTime = []

  public reservationDate = {
    day: '',
    hour: ''
  }

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      numberOfClients: ['', Validators.required],
      clients: new FormArray([])
    })
  }

  ngOnChanges() {
    this.clients.push(this.user)
    this.user.friends.forEach(friend => this.clients.push(friend))
    console.log('le client et ses amis (change)', this.clients)
    this.tables = this.restaurant.tables
    console.log('les tables du resto', this.tables)
  }

  get f() { return this.form.controls; }
  get c() { return this.f.clients as FormArray; }


  onChangeClients(e) {
    const numberOfClients = e.target.value || 0;
    if (this.c.length < numberOfClients) {
      for (let i = this.c.length; i < numberOfClients; i++) {
        this.c.push(this.formBuilder.group({
          name: ['guest', Validators.required],
        }));
      }
    } else {
      for (let i = this.c.length; i >= numberOfClients; i--) {
        this.c.removeAt(i);
      }
    }
  }

  clientSelected(event, index) {
    this.c.at(index).patchValue({ name: event }, { onlySelf: true })
  }

  dateSelected(event) {
    this.maxPlaces = 0;
    this.bookingsAtTime = []
    this.tablesAtTime = []
    this.reservationDate = event;

    const queries = this.tables.map(table => this.bookingService.getBookingByTable(table.id))

    //ForkJoin pour faire des requêtes en parallèle: https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
    // forkJoin(queries).subscribe(res => {
    //   console.log("forkJoin res", res)
    // })

    this.tables.forEach(table => {
      this.bookingService.getBookingByTable(table.id).subscribe(
        data => {
          let res = Object.values(data.body)
          this.bookingsAtTime = res.filter(booking => booking.day.substring(0, 10) == this.reservationDate.day && booking.hour == this.reservationDate.hour + ':00')
          if (this.bookingsAtTime.length) {
            const occupiedPlaces = this.bookingsAtTime.reduce((acc, booking) => {
              acc = acc + booking.clients.length
              console.log('acc :', acc)
              return acc
            }, 0)
            const vacant = table.capacity - occupiedPlaces
            table = { ...table, vacant: vacant }
            this.tablesAtTime.push(table)
            this.maxPlaces < table.vacant ?  this.maxPlaces = table.vacant : this.maxPlaces = this.maxPlaces
            console.log('booking object', this.bookingsAtTime)
            console.log('maxPlaces', this.maxPlaces)
          } else {
            const vacant = table.capacity
            this.tablesAtTime.push({...table, vacant : vacant})
            this.maxPlaces < table.capacity ?  this.maxPlaces = table.capacity : this.maxPlaces = this.maxPlaces
            console.log('maxPlaces', this.maxPlaces)
          }
        })
    })
  }

  selectBestTable(clients: number, tables: any) {
    const sortedTables = tables.filter(table => clients <= parseInt(table.vacant))
      .sort((a, b) => parseInt(a.vacant) - parseInt(b.vacant)
      );
      // console.log('bestTable', sortedTables.shift())
    return sortedTables.shift()
  }

  placeReservation() {
    const bestTable = this.selectBestTable(this.form.value.clients.length, this.tablesAtTime);
    console.log('best table after call to select bestTable in placeresa', bestTable)
    let clients = this.user.friends.filter(friend => {
      return this.form.value.clients.map(e => e.name).includes(friend.id)
    })
    clients.push(this.user)
    const booking = {
      day: this.reservationDate.day,
      hour: this.reservationDate.hour + ':00',
      table: {id: bestTable.id, name: bestTable.name, capacity: bestTable.capacity},
      orders: [],
      clients: clients
    }
    console.log('Registering Reservation for', booking)
    this.bookingService.postBooking(booking).subscribe(
      (data: any) => {
        console.log('response', data)
        const res = data.body
        this.userService.addBooking(this.user.id, res.id).subscribe(
          date => {
            console.log('data after adding booking to user', data.body)
          }
        )
      }
    )
    this.reservationDate = {
      day: '',
      hour: ''
    }
  }
}
