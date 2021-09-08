import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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

  public tables: any = [{
    name: 'Table 1',
    capacity: 6
  },
  {
    name: 'Table 2',
    capacity: 4
  }];

  public maxPlaces: number;
  // private availablePlaces: number;
  public reservationDate = {
    day: '',
    hour: ''
  }

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.maxPlaces = this.tables.reduce((acc, table) => {
      acc < parseInt(table.capacity) ? acc = parseInt(table.capacity) : acc = acc
      return acc
    }, 0);

    this.form = this.formBuilder.group({
      numberOfClients: ['', Validators.required],
      clients: new FormArray([])
    })
  }

  ngOnChanges() {
    this.clients.push(this.user)
    this.user.friends.forEach(friend => this.clients.push(friend))
    console.log('le client et ses amis (change)', this.clients)
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
    const bestTable = this.selectBestTable(this.form.value.clients.length, this.tables);
    console.log('Registering Reservation for', clientList, bestTable)
    alert('reservation Ok');
  }

  selectBestTable(clients: number, tables: any) {
    const sortedTables = tables.filter(table => clients <= parseInt(table.capacity))
      .sort((a, b) => parseInt(a.capacity) - parseInt(b.capacity)
      );
    return sortedTables.shift()
  }

  dateSelected(event) {
    this.reservationDate = event;
    console.log('resa date', this.reservationDate)
    console.log('restaurant has table ?', this.restaurant)
  }
}
