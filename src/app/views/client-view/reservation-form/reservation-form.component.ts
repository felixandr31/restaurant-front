import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import { BookingService } from 'src/app/services/data/booking.service';

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

  // private availablePlaces: number;
  public reservationDate = {
    day: '',
    hour: ''
  }

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private bookingService: BookingService
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

  placeReservation() {
    console.log('nb clients', this.form.value.clients.length)
    console.log('form values', this.form.value)
    let clientList = this.form.value.clients;
    const bestTable = this.selectBestTable(this.form.value.clients.length, this.tablesAtTime);
    console.log('Registering Reservation for', clientList, bestTable)
    alert('reservation Ok');
  }

  selectBestTable(clients: number, tables: any) {
    const sortedTables = tables.filter(table => clients <= parseInt(table.vacant))
      .sort((a, b) => parseInt(a.vacant) - parseInt(b.vacant)
      );
    return sortedTables.shift()
  }

  dateSelected(event) {
    this.reservationDate = event;

    let bookingsAtTime = []
    this.tables.forEach(table => {
      this.bookingService.getBookingByTable(table.id).subscribe(
        data => {
          let res = Object.values(data.body)
          bookingsAtTime = res.filter(booking => booking.day.substring(0, 10) == this.reservationDate.day && booking.hour == this.reservationDate.hour + ':00')
          if (bookingsAtTime.length) {
            const occupiedPlaces = bookingsAtTime.reduce((acc, booking) => {
              acc = acc + booking.clients.length
              return acc
            }, 0)
            const vacant = table.capacity - occupiedPlaces
            table = { ...table, vacant: vacant }
            this.tablesAtTime.push(table)
            this.maxPlaces < table.vacant ?  this.maxPlaces = table.vacant : this.maxPlaces = this.maxPlaces
          } else {
            const vacant = table.capacity
            this.tablesAtTime.push({...table, vacant : vacant})
            this.maxPlaces < table.capacity ?  this.maxPlaces = table.capacity : this.maxPlaces = this.maxPlaces
          }
        })
    })
  }
}
