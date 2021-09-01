import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input() client: any;
  @Output() onReservationSelection = new EventEmitter();

  public reservations: any = [
    {
      restaurant: 'Zozan',
      clients: [
        { name: "Georges" },
        { name: "Alain" }
      ]
    },
    {
      restaurant: 'BFC',
      clients: [
        { name: 'Georges' }
      ]
    },
    {
      restaurant: 'Zozan',
      clients: [
        { name: 'Georges' },
        { name: 'Elsa' }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  reservationSelected(event) {
    this.onReservationSelection.emit(event.target.value)
  }
}
