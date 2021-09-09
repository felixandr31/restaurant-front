import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-to-table-reservation',
  templateUrl: './to-table-reservation.component.html',
  styleUrls: ['./to-table-reservation.component.css']
})
export class ToTableReservationComponent implements OnInit {

  @Input() restaurant: any;
  @Output() onReservationDisplay = new EventEmitter();

  public formToggled = true;

  constructor() { }

  ngOnInit() {
  }

  toggleReservationForm(event) {
    this.formToggled = !this.formToggled;
    return this.onReservationDisplay.emit(event);
  }
}
