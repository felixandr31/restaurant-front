import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  @Input() restaurant: any;
  @Input() client: any;

  public clients: any = [
    {
      name: 'georges',
      roles: [
        { name: 'Admin' },
        { name: 'Client' }
      ]
    },
    {
      name: 'alain',
      roles: [
        { name: 'Waiter' },
        { name: 'Client' }
      ]
    },
    {
      name: 'sandrine',
      roles: [
        { name: 'Client' }
      ]
    }
  ]

  public tables: any = [{
    name: 'Table 1',
    capacity: 6
  },
  {
    name: 'Table 2',
    capacity: 4
  }];

  public maxPlaces: number;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
}
