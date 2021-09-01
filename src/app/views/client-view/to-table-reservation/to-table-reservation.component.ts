import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-to-table-reservation',
  templateUrl: './to-table-reservation.component.html',
  styleUrls: ['./to-table-reservation.component.css']
})
export class ToTableReservationComponent implements OnInit {

  @Input() restaurant: any;
  @Output() onReservationDisplay = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleReservationForm(event) {
    return this.onReservationDisplay.emit(event);
  }
}
